import { OutwardsSourceData } from "AI/AIUreium/roles/maintain/scouter/recordRoomData";
import { stopOutwardsSource } from "AI/AIUreium/room/outwardsSource/stop";

export function chooseSource(mainRoom: Room): void {
    let sourceNum = 2;
    const chosenSourceDataList: { [sourceName: string]: OutwardsSourceData } = {};
    Object.entries(Memory.rooms).forEach(roomData => {
        const [sourceRoomName, roomMemory] = roomData;
        if (!roomMemory.sources) return;
        Object.entries(roomMemory.sources).forEach(sourceDataEntry => {
            const [sourceName, originRoomToSourceData] = sourceDataEntry;
            Object.entries(originRoomToSourceData).forEach(singleRoomToSourceDataEntry => {
                const [originRoomName, singleRoomToSourceData] = singleRoomToSourceDataEntry;
                if (originRoomName !== mainRoom.name) return;
                if (singleRoomToSourceData.pathLength > 120) return;
                if (!singleRoomToSourceData.inUse) {
                    chosenSourceDataList[sourceName] = singleRoomToSourceData;
                } else {
                    sourceNum = sourceNum - 1;
                }
            });
        });
    });
    if (Object.keys(chosenSourceDataList).length < sourceNum) return;
    const sortedSourceDataList = Object.values(chosenSourceDataList).sort((a, b) => a.pathLength - b.pathLength);
    let index = 0;
    while (index < sourceNum) {
        index++;
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = true;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName][sourceData.sourceName] = {};
    }

    index = sourceNum;
    while (index < sortedSourceDataList.length) {
        index++;
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = false;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        stopOutwardsSource(sourceData.originRoomName, sourceData.sourceRoomName, sourceData.sourceName);
    }
}
