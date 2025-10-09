import { initAiUreimuRoomMemory } from "../utils";
import { getNewRoomProject } from "./taskRelation";

export function maintainNewRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom) {
                room.memory.AIUreium = initAiUreimuRoomMemory();
            }
            for (const claimRoomName in room.memory.AIUreium.newRoom) {
                getNewRoomProject(room.name, claimRoomName).run();
            }
        }
    });
}
