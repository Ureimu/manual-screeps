import { OutwardsSourceData } from "AI/AIUreium/roles/maintain/scouter/recordRoomData";
import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { PosStr } from "utils/RoomPositionToStr";
import { outwardsSourceTaskArgs } from "./taskRelation";

export function startOutwardsSource(sourceData: OutwardsSourceData): void {
    const sourcesMemoryData = Memory.rooms[sourceData.sourceRoomName].sources;
    if (!sourcesMemoryData) return;
    sourcesMemoryData[sourceData.sourceName].inUse = true;
    sourcesMemoryData[sourceData.sourceName].originRoomName = sourceData.originRoomName;
    const mainRoom = Game.rooms[sourceData.originRoomName];
    if (!mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName]) {
        mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName] = {};
    }
    mainRoom.memory.AIUreium.outwardsSource[sourceData.sourceRoomName][sourceData.sourceName] = {};
    const spawnName = mainRoom.memory.construct.firstSpawnName?.name;
    if (!spawnName) return;
    const ret = PathFinder.search(
        Game.spawns[spawnName].pos,
        { pos: Game.flags[sourceData.sourceName].pos, range: 1 },
        { maxOps: 1000 * 50, roomCallback: getCostMatrix }
    );
    sourceData.path = ret.path.map(pos => PosStr.setPosToStr(pos));
}
