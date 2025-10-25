import {
    getGclSumProcessBeforeLevel,
    getGplSumProcessBeforeLevel,
    getRclSumProcessBeforeLevel
} from "frame/calculator/gclGplRcl";
import { FrameStats } from "frame/ui/type";
import { TimeSeriesDataEngine } from "utils/TimeSeriesData/engine";
import { SingleTypedTreeData, SingleData } from "utils/TimeSeriesData/type";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "StatsEngine");

const dataGenerator = (): SingleTypedTreeData<SingleData<number>> => {
    const data: FrameStats<number> = {
        userData: {
            credits: {
                data: Math.round(Game.market.credits / 1000),
                depth: 21,
                type: "resources"
            },
            pixels: {
                data: Math.round(Game.resources[PIXEL] ?? 0),
                depth: 21,
                type: "resources"
            },
            gclProgress: {
                data: Math.round(Game.gcl.progress + getGclSumProcessBeforeLevel(Game.gcl.level)),
                depth: 41,
                type: "resources"
            },
            gplProgress: {
                data: Math.round(Game.gpl.progress + getGplSumProcessBeforeLevel(Game.gpl.level)),
                depth: 41,
                type: "resources"
            }
        },
        roomData: {}
    };
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            const storageEnergyData: SingleData<number> = {
                data: room.storage?.store[RESOURCE_ENERGY] ?? 0,
                type: "storage",
                depth: 23
            };
            const controllerProgress: SingleData<number> = {
                data: room.controller?.progress + getRclSumProcessBeforeLevel(room.controller?.level ?? 0),
                type: "controllerProgress",
                depth: 24
            };

            data.roomData[room.name] = {
                storageData: { energy: storageEnergyData },
                controllerProgress,
                outwardsSourceEnergy: {}
            };
            if (room.memory?.AIUreium?.outwardsSource) {
                Object.keys(room.memory.AIUreium.outwardsSource).forEach(sourceRoomName => {
                    Object.keys(room.memory.AIUreium.outwardsSource[sourceRoomName]).forEach(sourceName => {
                        const roomSourcesMemory = Memory.rooms[sourceRoomName].sources;
                        if (!roomSourcesMemory) return;
                        data.roomData[room.name].outwardsSourceEnergy[sourceName] = {
                            data: roomSourcesMemory[sourceName].roomData[room.name].harvestedEnergyNum,
                            depth: 41,
                            type: "any"
                        };
                        roomSourcesMemory[sourceName].roomData[room.name].harvestedEnergyNum = 0;
                    });
                });
            }
        }
    });
    return data as unknown as SingleTypedTreeData<SingleData<number>>;
};
export const statsEngine = new TimeSeriesDataEngine(dataGenerator, { interval: 1.5 * 60 * 60 * 1000 });
logger.log(`dataSizePerDay: ${statsEngine.getDataSizePerDay()} byte/day`);
