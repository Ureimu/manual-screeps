import { getMaintainRoomProject } from "./maintain/taskRelation";
import { getOutwardsHarvestProject } from "./outwardsSource/taskRelation";

export function callOnStart(): void {
    // _.forEach(Game.rooms, room => {
    //     if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
    //         getMaintainRoomProject(room.name).callOnStart();
    //         if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom)
    //             room.memory.AIUreium = { maintainRoom: {}, outwardsSource: {} };
    //         for (const sourceRoomName in room.memory.AIUreium.outwardsSource) {
    //             for (const sourceName in room.memory.AIUreium.outwardsSource) {
    //                 getOutwardsHarvestProject(room.name, sourceRoomName, sourceName).callOnStart();
    //             }
    //         }
    //     }
    // });

    return;
}
