import UTF15 from "../../utils/utf15";
import { getDataNodeList, setDataNodeList, TimeSeriesDataStorage } from "./storage";
import { SingleData, SingleTypedTreeData } from "./type";
interface EngineOpts {
    interval: number;
}
export class TimeSeriesDataEngine<T extends SingleTypedTreeData<SingleData<number>>> {
    private dataGetter: () => T;
    private opts: EngineOpts;
    /**
     * Creates an instance of TimeSeriesDataEngine.
     * @param {() => T} dataGetter 获取统计数据。每次返回的数据结构应保证不会与之前的结构冲突。
     * @memberof TimeSeriesDataEngine
     */
    public constructor(dataGetter: () => T, opts?: Partial<EngineOpts>) {
        this.dataGetter = dataGetter;
        if (opts) {
            const { interval = 15 * 60 * 1000 } = opts;
            this.opts = { interval };
        } else {
            this.opts = { interval: 15 * 60 * 1000 };
        }
        if (Memory.timeSeries) {
            if (Memory.timeSeries.interval !== this.opts.interval) {
                Memory.timeSeries.interval = this.opts.interval;
            }
        }
    }
    public judgeTime(): boolean {
        const timeNow = Date.now();
        const timeSeries = this.timeData;

        if (timeNow - timeSeries.lastRecordTime >= timeSeries.interval) {
            timeSeries.lastRecordTime = timeNow;
            return true;
        }
        return false;
    }
    private get timeData(): timeSeriesData {
        if (!Memory.timeSeries)
            Memory.timeSeries = {
                startTime: Date.now(),
                lastRecordTime: 0,
                interval: this.opts.interval, // 默认间隔15分钟
                idList: [0],
                ifStart: false,
                activeId: 0,
                ifReadData: false,
                storeNum: 0,
                ifSwitchActiveId: false
            };
        return Memory.timeSeries;
    }
    private init(seriesData: SingleTypedTreeData<SingleData<string>>, dataInThisTick: T): void {
        _.assign(seriesData, _.cloneDeep(dataInThisTick));
        const seriesDataNodeList = getDataNodeList<typeof seriesData, SingleData<string>, string>(seriesData);
        const nodeList = getDataNodeList<T, SingleData<number>, number>(dataInThisTick);
        Object.entries(seriesDataNodeList).forEach(([key, value]) => {
            // console.log(key);
            const { depth } = value;
            const codec = new UTF15({ depth, array: true, meta: true });
            value.data = codec.encode([nodeList[key].data]);
            console.log([nodeList[key].data], codec.decode(value.data));
        });
    }
    public getDataInThisTick(): T {
        const dataInThisTick = this.dataGetter();
        dataInThisTick.timeStamp = { data: Date.now(), type: "time", depth: 41 };
        dataInThisTick.gameTime = { data: Game.time, type: "time", depth: 41 };
        return dataInThisTick;
    }
    private switchActiveId(): void {
        this.timeData.activeId = this.getNextSegmentId();
        this.timeData.ifSwitchActiveId = true;
    }
    private getNextSegmentId(): number {
        const index = this.timeData.idList.findIndex(value => value === this.timeData.activeId);
        if (index + 1 >= this.timeData.idList.length) {
            return this.timeData.idList[0];
        } else {
            return this.timeData.idList[index + 1];
        }
    }
    private checkStorageSize(
        storage: TimeSeriesDataStorage<SingleTypedTreeData<SingleData<string>>, SingleData<string>>
    ): boolean {
        const dataSize = storage.getSeriesDataSize(this.timeData.activeId);
        if (dataSize > 95 * 1000) {
            this.timeData.ifSwitchActiveId = true;
            RawMemory.setActiveSegments([this.getNextSegmentId()]);
            return false;
        }
        return true;
    }
    public storeData(): void {
        if (this.timeData.ifSwitchActiveId) {
            this.switchActiveId();
            RawMemory.segments[this.timeData.activeId] = "";
            return;
        }
        if (this.timeData.ifStart) {
            const dataInThisTick = this.getDataInThisTick();
            const dataStorage = new TimeSeriesDataStorage(this.timeData.idList);
            if (!this.checkStorageSize(dataStorage)) return;
            const seriesData = dataStorage.getSeriesData(this.timeData.activeId);
            // console.log(`seriesData: ${JSON.stringify(seriesData)}`);
            const seriesDataNodeList = getDataNodeList<typeof seriesData, SingleData<string>, string>(seriesData);
            const nodeList = getDataNodeList<T, SingleData<number>, number>(dataInThisTick);
            Object.entries(nodeList).forEach(([key, value]) => {
                // console.log(key);
                if (seriesDataNodeList[key]) {
                    const { depth, data } = seriesDataNodeList[key];
                    const codec = new UTF15({ depth, array: true, meta: true });
                    const numberList = codec.decode(data);
                    if (
                        numberList.length < 10 ||
                        !numberList
                            .slice(numberList.length - 10, numberList.length)
                            .every(listValue => listValue === value.data)
                    ) {
                        numberList.push(value.data);
                    } else {
                        const mutations = seriesDataNodeList[key].mutations;
                        if (!mutations) {
                            seriesDataNodeList[key].mutations = [[numberList.length, 1]];
                        }
                        if (mutations) {
                            if (mutations[mutations.length - 1]) {
                                if (mutations[mutations.length - 1][0] === numberList.length) {
                                    mutations[mutations.length - 1][1]++;
                                } else {
                                    mutations.push([numberList.length, 1]);
                                }
                            } else {
                                throw new Error("how");
                            }
                        }
                    }

                    seriesDataNodeList[key].data = codec.encode(numberList);
                } else {
                    const { depth, data, type } = nodeList[key];
                    seriesDataNodeList[key] = { depth, data: "", type };
                    const codec = new UTF15({ depth, array: true, meta: true });
                    seriesDataNodeList[key].data = codec.encode([data]);
                    const mutations = seriesDataNodeList[key].mutations;
                    if (!mutations) {
                        seriesDataNodeList[key].mutations = [[0, this.timeData.storeNum]];
                    }
                }
            });
            const convertedSeriesData =
                setDataNodeList<typeof seriesData, SingleData<string>, string>(seriesDataNodeList);
            dataStorage.setSeriesData(this.timeData.activeId, convertedSeriesData);
            dataStorage.save();
            this.timeData.storeNum++;
            this.timeData.ifStart = false;
        }
        if (this.judgeTime()) {
            this.timeData.ifStart = true;
            RawMemory.setActiveSegments([this.timeData.activeId]);
        }
    }
    public getSegmentIdList(): number[] {
        return this.timeData.idList;
    }
    public readData(): SingleTypedTreeData<SingleData<number[]>> {
        const dataStorage = new TimeSeriesDataStorage(this.timeData.idList);
        const seriesData = dataStorage.getSeriesData(this.timeData.activeId);
        const seriesDataCopy = _.cloneDeep(seriesData) as SingleTypedTreeData<SingleData<number[] | string>>;
        const seriesDataNodeList = getDataNodeList<typeof seriesData, SingleData<string>, string>(seriesData);
        const seriesDataNodeListCopy = getDataNodeList<
            typeof seriesDataCopy,
            SingleData<number[] | string>,
            number[] | string
        >(seriesDataCopy) as SingleTypedTreeData<SingleData<number[] | string>>;
        Object.entries(seriesDataNodeList).forEach(([key, value]) => {
            // console.log(key);
            const { depth } = value;
            const codec = new UTF15({ depth, array: true, meta: true });
            let data = codec.decode(value.data);
            // read mutations and insert extra data
            const mutations = value.mutations;
            if (mutations) {
                mutations.reduce((sumNum, [length, num]) => {
                    const sumLength = sumNum + length;
                    data = data
                        .slice(0, sumLength)
                        .concat(_.fill(Array(num), data[sumLength - 1]), data.slice(sumLength, data.length));
                    return sumNum + num;
                }, 0);
            }
            seriesDataNodeListCopy[key].data = data;
        });
        return seriesDataCopy as SingleTypedTreeData<SingleData<number[]>>;
    }
    /**
     * 获得位深度总和。
     *
     * @returns {number}
     * @memberof TimeSeriesDataEngine
     */
    public getDepthSum(): number {
        const dataInThisTick = this.getDataInThisTick();
        const nodeList = getDataNodeList<T, SingleData<number>, number>(dataInThisTick);
        return Object.values(nodeList).reduce((lastValue, node) => {
            lastValue += node.depth;
            return lastValue;
        }, 0);
    }
    /**
     * 获得一天产生的平均数据量，以字节为单位
     *
     * @returns {number}
     * @memberof TimeSeriesDataEngine
     */
    public getDataSizePerDay(): number {
        const depthNum = this.getDepthSum();
        const dayTime = 86400 * 1000;
        const interval = this.opts.interval;
        return ((dayTime / interval) * depthNum) / 15;
    }
}

declare global {
    interface Memory {
        timeSeries: timeSeriesData;
    }
}

interface timeSeriesData {
    startTime: number;
    lastRecordTime: number;
    interval: number;
    idList: number[];
    ifStart: boolean;
    activeId: number;
    ifReadData: boolean;
    storeNum: number;
    ifSwitchActiveId: boolean;
}
