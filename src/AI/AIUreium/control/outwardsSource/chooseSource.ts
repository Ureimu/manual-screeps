import { OutwardsSourceData } from "AI/AIUreium/control/recordRoomData";
import { startOutwardsSource } from "AI/AIUreium/room/outwardsSource/start";
import { stopOutwardsSource } from "AI/AIUreium/room/outwardsSource/stop";
import { checkControllerRoomName } from "utils/roomNameUtils";
import { resourceLimit } from "../constants/roomResource";
import { Constant } from "../constants/roomTaskControl";
import { getRoomControlData } from "..";
import { OutwardsSourceCheckInterval } from "./constant";
import { logManager } from "utils/log4screeps";

declare global {
    interface TaskStatus {
        outwardsSource?: boolean;
    }
}
const logger = logManager.createLogger("debug", "chooseSource");
export function chooseSource(mainRoom: Room): void {
    if (!getRoomControlData(mainRoom.name).outwardsSource) return;
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
    if (status.outwardsSource) {
        sourceNum = outwardsSource.sourceNum;
        logger.debug(`sourceNum: ${outwardsSource.sourceNum}, `);
    }
    const chosenSourceDataList: { [sourceName: string]: OutwardsSourceData } = {};
    const maxDistance = getRoomControlData(mainRoom.name).outwardsSource.maxDistance;
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
                    return;
                } else if (originRoomToSourceData.originRoomName !== mainRoom.name) {
                    return; // 外矿被别的房间用了直接return
                }
            }
            if (!originRoomToSourceData.roomData) return;
            Object.entries(originRoomToSourceData.roomData).forEach(singleRoomToSourceDataEntry => {
                const [originRoomName, singleRoomToSourceData] = singleRoomToSourceDataEntry;
                if (originRoomName !== mainRoom.name) return;
                if (singleRoomToSourceData.pathLength > maxDistance) return;
                if (roomMemory.owner) return;
                if (!singleRoomToSourceData.inUse) {
                    chosenSourceDataList[sourceName] = singleRoomToSourceData;
                }
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
        if (sourceData && sourceData.inUse) {
            logger.debug(
                `sourceData: ${sourceData.sourceName} stop outwardsSource index:${index}<${sortedSourceDataList.length}`
            );
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
        index++;
    }
}
