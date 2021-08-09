import { OutwardsSourceData } from "AIUreium/roles/maintain/scouter/recordRoomData";

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
    for (let index = 0; index < sourceNum; index++) {
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = true;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName][sourceData.sourceName] = {};
    }
    for (let index = sourceNum; index < sortedSourceDataList.length; index++) {
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = false;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        delete mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName][sourceData.sourceName];
    }
}
