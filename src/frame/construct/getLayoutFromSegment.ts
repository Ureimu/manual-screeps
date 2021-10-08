import { consoleStyle, LogLevel } from "frame/console/style";
import { AcrossTick, newAcrossTickTask } from "utils/AcrossTick";
import { SegmentManager } from "utils/SegmentManager";
import { formedLayout } from "./type";
const callSegmentId = 30;
export interface CallLayoutData {
    cacheIdList: number[];
    cacheIdRange: { start: number; end: number };
    shardName: string;
    roomData: {
        [roomName: string]: {
            cacheId: number;
            roomName: string;
            hasGotData: boolean;
            inUse: boolean;
        };
    };
}
export interface CacheLayoutData {
    layout: formedLayout;
    firstSpawn: {
        pos: string;
    };
    centerPos: string;
    freeSpacePosList: string[];
}
const RawMemoryCache: { [id: number]: string } = {};
const layoutDataCache: { [roomName: string]: CacheLayoutData } = {};
const debug = (log: string, level: LogLevel) => void 0; // console.log(consoleStyle("getLayoutFromSegment")(log, level));
export function getLayoutFromSegment(roomName: string): CacheLayoutData | undefined {
    const callData = getCallLayoutData(roomName);
    if (!callData) {
        debug(`${roomName} callLayout数据不存在，尝试下一个tick获取`, "log");
        newAcrossTickTask(
            {
                taskName: "asyncGetLayout1",
                executeTick: Game.time,
                args: [roomName],
                intervalTick: 1,
                log: false
            },
            data => {
                const roomNameHere = data.args[0] as string;
                const dataHere = getLayoutFromSegment(roomNameHere);
                if (dataHere) {
                    layoutDataCache[roomNameHere] = dataHere;
                }
                return "finish";
            }
        );
        return;
    }
    const callRoomData = callData.roomData[roomName];
    const cacheId = callRoomData.cacheId;
    if (layoutDataCache[roomName]) {
        debug(`${roomName} layout数据缓存存在`, "log");
        debug(`${roomName} layout获取完成`, "log");
        return layoutDataCache[roomName];
    }
    const segmentData = RawMemory.segments[cacheId] ?? RawMemoryCache[cacheId];
    if (segmentData) {
        debug(`${roomName} layout数据存在`, "log");
        RawMemoryCache[cacheId] = segmentData;
        callRoomData.hasGotData = true;
        debug(`${roomName} layout获取完成`, "log");
        updateCallData(callData);
        return JSON.parse(segmentData) as CacheLayoutData;
    } else {
        SegmentManager.addId([callSegmentId]);
        const returnId = SegmentManager.addId([cacheId]);
        if (returnId.length > 0) {
            newAcrossTickTask(
                {
                    taskName: "asyncGetLayout2",
                    executeTick: Game.time,
                    args: [roomName],
                    intervalTick: 1,
                    log: false
                },
                data => {
                    const roomNameHere = data.args[0] as string;
                    const dataHere = getLayoutFromSegment(roomNameHere);
                    if (dataHere) {
                        layoutDataCache[roomNameHere] = dataHere;
                    }
                    return "finish";
                }
            );
        } else {
            debug(`该tick segment已满`, "log");
        }
        debug(`${roomName} layout数据不存在，尝试下一个tick获取`, "log");
        updateCallData(callData);
        return;
    }
}

export function getCallLayoutData(roomName: string): CallLayoutData | undefined {
    let callData: CallLayoutData;
    if (!SegmentManager.isActive(callSegmentId)) {
        SegmentManager.addId([callSegmentId]);
        return;
    }
    const callSegmentData = RawMemory.segments[callSegmentId];
    if (callSegmentData) {
        debug("获取到了callData数据", "log");
        callData = JSON.parse(callSegmentData) as CallLayoutData;
    } else {
        debug("未获取到callData数据,自动生成中", "log");
        callData = {
            cacheIdList: [],
            cacheIdRange: { start: 50, end: 90 },
            roomData: {},
            shardName: Game.shard.name
        };
        debug("生成完成", "log");
    }
    if (!callData.roomData[roomName]) {
        debug(`未获取到 ${roomName} callData数据,自动生成中`, "log");
        const cacheIdHere =
            _.range(callData.cacheIdRange.start, callData.cacheIdRange.end).find(
                i => !callData.cacheIdList.find(j => j === i)
            ) ??
            (() => {
                throw new Error("cacheIdList已满");
            })();
        callData.cacheIdList.push(cacheIdHere);
        callData.roomData[roomName] = {
            roomName,
            cacheId: cacheIdHere,
            hasGotData: false,
            inUse: true
        };
        debug(`${roomName} callData数据生成完成`, "log");
        updateCallData(callData);
    }
    return callData;
}

export function updateCallData(callData: CallLayoutData): void {
    RawMemory.segments[callSegmentId] = JSON.stringify(callData);
}
