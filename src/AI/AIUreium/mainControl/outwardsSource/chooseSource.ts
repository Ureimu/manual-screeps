import { OutwardsSourceData } from "AI/AIUreium/roles/maintain/scouter/recordRoomData";
import { stopOutwardsSource } from "AI/AIUreium/room/outwardsSource/stop";
import { getCostMatrix } from "frame/construct/composition/gridLayout/costMatrix";
import { PosStr } from "utils/RoomPositionToStr";

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
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = true;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName][sourceData.sourceName] = {};
        index++;
        const spawnName = mainRoom.memory.construct.firstSpawnName.name;
        const ret = PathFinder.search(
            Game.spawns[spawnName].pos,
            { pos: Game.flags[sourceData.sourceName].pos, range: 1 },
            { maxOps: 1000 * 50, roomCallback: getCostMatrix }
        );
        sourceData.path = ret.path.map(pos => PosStr.setPosToStr(pos));
    }

    index = sourceNum;
    while (index < sortedSourceDataList.length) {
        const sourceData = sortedSourceDataList[index];
        sourceData.inUse = false;
        delete sourceData.path;
        if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
            mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
        }
        stopOutwardsSource(sourceData.originRoomName, sourceData.sourceRoomName, sourceData.sourceName);
        index++;
    }
}
