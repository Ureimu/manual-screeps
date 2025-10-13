import { assert } from "chai";
import { writeFileSync } from "fs";
import { describe } from "mocha";
import { SegmentManager } from "utils/SegmentManager";
import { TimeSeriesDataEngine } from "utils/TimeSeriesData/engine";
import { getDataNodeList, setDataNodeList } from "utils/TimeSeriesData/storage";
import { SingleTypedTreeData, SingleData } from "utils/TimeSeriesData/type";
import { mockConstants } from "./mock";
const wait = (ms: number) => {
    const timeStart = Date.now();
    let timeEnd = Date.now();
    while (timeStart + ms > timeEnd) {
        timeEnd = Date.now();
    }
    // console.log(`执行时间: ${timeEnd - timeStart}`);
};
mockConstants();
const runEpoch = (num: number, f: () => unknown) => {
    for (let i = 0; i < num; i++) {
        f();
    }
};
const getRandomList = (min: number, max: number, num: number) => {
    const numList: number[] = [];
    const interval = max - min;
    runEpoch(num, () => {
        numList.push(Math.round(Math.random() * interval + min));
    });
    return numList;
};

describe("TimeSeriesData", () => {
    it("storage runs", () => {
        const epochCount = 0;
        const testEpochNum = 750;
        const randomData = getRandomList(10, 1500, testEpochNum);
        const dataGenerator = (): SingleTypedTreeData<SingleData<number>> => {
            return {
                gameTime: { data: Game.time, depth: 41, type: "time" },
                testData: { data: randomData[epochCount], depth: 11, type: "rand" },
                roomData: { E34S21: { gameTime: { data: Game.time, depth: 41, type: "time" } } }
            };
        };
        const data = dataGenerator();
        const nodeList = getDataNodeList(data);
        const convertedList = setDataNodeList(nodeList);
        assert.deepEqual(data, convertedList);
    });

    it("engine runs", () => {
        const testEpochNum = 2000;
        const randomData = getRandomList(10, 1500, testEpochNum);

        let epochCount = 0;
        const dataGenerator = (): SingleTypedTreeData<SingleData<number>> => {
            return {
                gameTime: { data: Game.time, depth: 41, type: "time" },
                testData: { data: randomData[epochCount], depth: 11, type: "rand" },
                roomData: {
                    E34S21: { gameTime: { data: Game.time, depth: 41, type: "time" } },
                    E35S21: { gameTime: { data: 2, depth: 41, type: "time" } }
                }
            };
        };
        const engine = new TimeSeriesDataEngine(dataGenerator, { interval: 10 });
        runEpoch(75, () => {
            const timeStart = Date.now();
            epochCount += 1;
            Game.time += 1;
            engine.storeData();
            wait(4);
            const timeEnd = Date.now();
            engine.getSegmentIdList();
            console.log(`[tick]: ${Game.time} finish; [duration]: ${timeEnd - timeStart}`);
        });
        console.log(Game.time);
        console.log(`depthSum: ${engine.getDepthSum()}`);
        console.log(`dataSizePerDay: ${engine.getDataSizePerDay()}`);
        const data = engine.readData();
        const gameTimeData = data.gameTime as SingleData<number[]>;
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        console.log(SegmentManager.readSegment(engine.getSegmentIdList()[0]));
        // writeFileSync("test/unit/test.json", jsonData);
        assert.isBelow(Game.time - Number(gameTimeData.data.pop()), 100);
    });
});
