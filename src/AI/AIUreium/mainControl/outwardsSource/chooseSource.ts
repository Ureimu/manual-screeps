import { OutwardsSourceData } from "AI/AIUreium/roles/maintain/scouter/recordRoomData";
import { startOutwardsSource } from "AI/AIUreium/room/outwardsSource/start";
import { stopOutwardsSource } from "AI/AIUreium/room/outwardsSource/stop";
import { consoleStyle, LogLevel } from "frame/console/style";
import { resourceLimit } from "../constants/roomResource";
import { Constant } from "../constants/roomTaskControl";

declare global {
    interface RoomMemory {
        status?: {
            outwardsSource?: boolean;
        };
    }
}

const debugMode = true;
const style = consoleStyle("ChooseSource");
const debug = (str: string, level: LogLevel = "log") => (debugMode ? console.log(style(str, level)) : void 0);
export function chooseSource(mainRoom: Room): void {
    debug(`${mainRoom.name} start`);
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
    debug(
        `storeEnergy: ${storeEnergy} max:${(
            resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop
        ).toFixed(0)}, min:${resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start}`
    );
    if (storeEnergy > resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop) {
        status.outwardsSource = false;
        debug(
            `storeEnergy: ${storeEnergy} > ${
                resourceLimit.storage.energy.max * Constant.outwardsSource.energyRate.stop
            }, stop. `
        );
    }
    if (storeEnergy < resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start) {
        status.outwardsSource = true;
        debug(
            `storeEnergy: ${storeEnergy} < ${
                resourceLimit.storage.energy.min * Constant.outwardsSource.energyRate.start
            }, start. `
        );
    }
    if (status.outwardsSource) {
        sourceNum = outwardsSource.sourceNum;
        debug(`sourceNum: ${outwardsSource.sourceNum}, `);
    }
    const chosenSourceDataList: { [sourceName: string]: OutwardsSourceData } = {};
    Object.entries(Memory.rooms).forEach(roomData => {
        const [roomName, roomMemory] = roomData;
        if (!roomMemory.sources) return; // 没有memory直接return
        const isControllerRoom = /(^[WE]\d*[1-9]+[NS]\d*[1-3|7-9]+$)|(^[WE]\d*[1-3|7-9]+[NS]\d*[1-9]+$)/.test(roomName);
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
                if (singleRoomToSourceData.pathLength > 80) return;
                if (roomMemory.owner) return;
                if (!singleRoomToSourceData.inUse) {
                    chosenSourceDataList[sourceName] = singleRoomToSourceData;
                }
            });
        });
    });
    const availableSourceLength = Object.keys(chosenSourceDataList).length;
    debug(
        `sourceData:availableSourceListLength: ${availableSourceLength}, ${Object.keys(
            chosenSourceDataList
        ).toString()} `
    );
    const startTime = mainRoom.memory.AIUreium?.newRoomData?.startTime;
    if (startTime && Game.time - startTime < 10000) {
        if (Object.keys(chosenSourceDataList).length < sourceNum) return;
    }

    const sortedSourceDataList = Object.values(chosenSourceDataList).sort((a, b) => a.pathLength - b.pathLength);
    let index = 0;
    // 添加符合条件的外矿
    while (index < sourceNum) {
        const sourceData = sortedSourceDataList[index];
        if (sourceData && !sourceData.inUse) {
            debug(`sourceData: ${sourceData.sourceName} start outwardsSource`);
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
            debug(
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
