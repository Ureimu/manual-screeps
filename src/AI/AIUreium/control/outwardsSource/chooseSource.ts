import { OutwardsSourceData } from "AI/AIUreium/control/recordRoomData";
import { startOutwardsSource } from "AI/AIUreium/projects/outwardsSource/start";
import { stopOutwardsSource } from "AI/AIUreium/projects/outwardsSource/stop";
import { checkControllerRoomName } from "utils/roomNameUtils";
import { Constant } from "../constants/roomTaskControl";
import { getRoomConfig } from "../../config";
import { OutwardsSourceCheckInterval } from "./constant";
import { logManager } from "utils/log4screeps";
import { getOCarrierBodyRatio } from "AI/AIUreium/projects/outwardsSource/tasks/createCreepGroup/createOCarryGroup";
import { MAX_ENERGY_PER_CONTROLLER_LEVEL } from "utils/constants";
import { RoomStatusOutwardsSource } from "./type";
import { getRoomResourceLimit } from "../../config/roomResources";

declare global {
    interface TaskStatus {
        outwardsSource?: boolean;
    }

    interface GlobalRoomMemory {
        status?: RoomStatusData;
    }
}

export interface RoomStatusData {
    outwardsSource?: RoomStatusOutwardsSource;
}

const logger = logManager.createLogger("debug", "chooseSource");
export function chooseSource(mainRoom: Room): void {
    if (!global.roomMemory[mainRoom.name]) global.roomMemory[mainRoom.name] = {};
    if (!global.roomMemory[mainRoom.name].status) {
        global.roomMemory[mainRoom.name].status = {};
    }
    const taskStatus = global.roomMemory[mainRoom.name].status;
    if (!taskStatus) return;
    if (!taskStatus.outwardsSource)
        taskStatus.outwardsSource = { lastRunTime: Game.time, sources: {}, isRunning: false };
    const runningStatus = taskStatus.outwardsSource;
    if (!getRoomConfig(mainRoom.name).outwardsSource.run) {
        // 移除所有外矿。
        const projectStorage = mainRoom.memory.AIUreium.outwardsSource;
        if (Object.keys(projectStorage).length > 0) {
            _.forEach(projectStorage, (projectRoomStorage, roomName) => {
                if (!roomName) return;
                _.forEach(projectRoomStorage, (project, sourceName) => {
                    if (!sourceName) return;
                    const sourceData = Memory.rooms[roomName].sources?.[sourceName].roomData[mainRoom.name];
                    if (!sourceData) return;
                    removeSource(mainRoom, runningStatus, sourceData);
                });
            });
        }
        return;
    }
    logger.debug(`${mainRoom.name} chooseSource start`);
    let sourceNum = 0;
    const { outwardsSource } = Constant;
    const storeEnergy = mainRoom.storage?.store[RESOURCE_ENERGY];

    if (!mainRoom.memory.status) {
        mainRoom.memory.status = {};
    }
    const status = mainRoom.memory.status;
    if (!status.outwardsSource) {
        status.outwardsSource = Constant.outwardsSource.defaultStatus;
    }

    if (!storeEnergy) return;
    const resourceLimit = getRoomResourceLimit(mainRoom.name);
    logger.debug(
        `storeEnergy: ${storeEnergy} max:${(
            resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop
        ).toFixed(0)}, min:${resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start}`
    );
    if (storeEnergy > resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop) {
        status.outwardsSource = false;
        logger.debug(
            `storeEnergy: ${storeEnergy} > ${
                resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop
            }, stop. `
        );
    }

    if (storeEnergy < resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start) {
        status.outwardsSource = true;
        logger.debug(
            `storeEnergy: ${storeEnergy} < ${
                resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start
            }, start. `
        );
    }
    runningStatus.isRunning = status.outwardsSource ?? false;
    if (status.outwardsSource) {
        sourceNum = outwardsSource.sourceNum;
        logger.debug(`sourceNum: ${outwardsSource.sourceNum}, `);
    }
    const chosenSourceDataList: { [sourceName: string]: OutwardsSourceData } = {};
    const setting = getRoomConfig(mainRoom.name).outwardsSource;
    const availableMaxDistance = getAvailableMaxDistance(mainRoom);
    logger.debug(
        `available max distance: ${availableMaxDistance.toFixed(0)}, setting distance: ${setting.maxDistance.toFixed(
            0
        )}`
    );
    const maxDistance = Math.min(availableMaxDistance, setting.maxDistance);
    const settingRoomList = setting.rooms;
    Object.entries(Memory.rooms).forEach(roomData => {
        const [roomName, roomMemory] = roomData;
        if (!roomMemory.sources) return; // 没有memory直接return
        const isControllerRoom = checkControllerRoomName.test(roomName);
        if (!isControllerRoom) return;
        Object.entries(roomMemory.sources).forEach(sourceDataEntry => {
            const [sourceName, originRoomToSourceData] = sourceDataEntry;
            if (originRoomToSourceData.inUse) {
                if (originRoomToSourceData.originRoomName === mainRoom.name) {
                    sourceNum = sourceNum - 1; // 已经有外矿在使用了则减一
                    runningStatus.sources[sourceName] = {
                        isInUse: true,
                        isChosen: false,
                        isRemoved: false,
                        reason: "is in use by this room."
                    };
                    return;
                } else if (originRoomToSourceData.originRoomName !== mainRoom.name) {
                    runningStatus.sources[sourceName] = {
                        isInUse: false,
                        isChosen: false,
                        isRemoved: false,
                        reason: `is in use by other room: ${originRoomToSourceData.originRoomName}`
                    };
                    return; // 外矿被别的房间用了直接return
                }
            }
            if (!originRoomToSourceData.roomData) return;
            Object.entries(originRoomToSourceData.roomData).forEach(singleRoomToSourceDataEntry => {
                const [originRoomName, singleRoomToSourceData] = singleRoomToSourceDataEntry;
                // 在这里设置是否使用外矿。
                if (originRoomName !== mainRoom.name) {
                    runningStatus.sources[sourceName] = {
                        isInUse: false,
                        isChosen: false,
                        isRemoved: false,
                        reason: `is in use by other room: ${originRoomName}`
                    };
                    return;
                }
                if (singleRoomToSourceData.pathLength > maxDistance) {
                    runningStatus.sources[sourceName] = {
                        isInUse: false,
                        isChosen: false,
                        isRemoved: false,
                        reason: `too far from room. path length: ${singleRoomToSourceData.pathLength} > ${maxDistance}`
                    };
                    return;
                }
                if (!settingRoomList.includes(roomName)) {
                    runningStatus.sources[sourceName] = {
                        isInUse: false,
                        isChosen: false,
                        isRemoved: false,
                        reason: `this room is not set in setting.`
                    };
                    return;
                }
                if (roomMemory.owner) {
                    runningStatus.sources[sourceName] = {
                        isInUse: false,
                        isChosen: false,
                        isRemoved: false,
                        reason: `this room is owned by others. owner: ${roomMemory.owner}`
                    };
                    return;
                }
                if (singleRoomToSourceData.inUse) {
                    runningStatus.sources[sourceName] = {
                        isInUse: true,
                        isChosen: false,
                        isRemoved: false,
                        reason: `is in use by this room.`
                    };
                    return;
                }

                chosenSourceDataList[sourceName] = singleRoomToSourceData;
                runningStatus.sources[sourceName] = {
                    isInUse: true,
                    isChosen: true,
                    isRemoved: false,
                    reason: `is chosen.`
                };
            });
        });
    });
    const availableSourceLength = Object.keys(chosenSourceDataList).length;
    logger.debug(
        `sourceData:availableSourceListLength: ${availableSourceLength}, ${Object.keys(
            chosenSourceDataList
        ).toString()} `
    );
    const startTime = mainRoom.memory.AIUreium?.newRoomData?.startTime;
    if (startTime && Game.time - startTime < OutwardsSourceCheckInterval) {
        // 如果才开始不到OutwardsSourceCheckInterval的时间，且已有的source数据小于选定的sourceNum，则不会执行外矿开采。
        // 该逻辑是为了保证scouter先找完附近的外矿，以保证选取的外矿为最佳的。
        logger.debug(`wait until ${startTime + OutwardsSourceCheckInterval} tick to start`);
        if (Object.keys(chosenSourceDataList).length < sourceNum) return;
    }

    const sortedSourceDataList = Object.values(chosenSourceDataList).sort((a, b) => a.pathLength - b.pathLength);
    let index = 0;
    // 添加符合条件的外矿
    while (index < sourceNum) {
        const sourceData = sortedSourceDataList[index];
        if (sourceData && !sourceData.inUse) {
            logger.debug(`sourceData: ${sourceData.sourceName} start outwardsSource`);
            sourceData.inUse = true;
            startOutwardsSource(sourceData);
        }
        index++;
    }

    // 删除多余外矿
    index = sourceNum;
    while (index < sortedSourceDataList.length) {
        const sourceData = sortedSourceDataList[index];
        removeSource(mainRoom, runningStatus, sourceData);
        index++;
    }
}

function getAvailableMaxDistance(room: Room): number {
    const setting = getRoomConfig(room.name).outwardsSource;
    const ratios = getOCarrierBodyRatio(setting.useRoad, setting.useReserver);
    const bodySize = Math.min(
        MAX_CREEP_SIZE,
        Math.floor(MAX_ENERGY_PER_CONTROLLER_LEVEL[room.controller?.level ?? 0] / 50)
    );
    return bodySize / (ratios.carry + ratios.move);
}

function removeSource(mainRoom: Room, runningStatus: RoomStatusOutwardsSource, sourceData: OutwardsSourceData) {
    if (sourceData && sourceData.inUse) {
        runningStatus.sources[sourceData.sourceName] = {
            isInUse: false,
            isChosen: false,
            isRemoved: true,
            reason: `max limit exceed, removed.`
        };
        logger.debug(`sourceData: ${sourceData.sourceName} stop outwardsSource`);
        sourceData.inUse = false;

        const sourcesMemoryData = Memory.rooms[sourceData.sourceRoomName].sources;
        if (!sourcesMemoryData) return;
        sourcesMemoryData[sourceData.sourceName].inUse = false;
        sourcesMemoryData[sourceData.sourceName].originRoomName = undefined;
        delete sourceData.path;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        stopOutwardsSource(sourceData.originRoomName, sourceData.sourceRoomName, sourceData.sourceName);
    }
}
