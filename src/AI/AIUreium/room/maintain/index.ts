import { DiagramMemory } from "utils/Project/type";
import { getMaintainRoomProject } from "./taskRelation";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom)
                room.memory.AIUreium = { maintainRoom: {}, outwardsSource: {} };
            const maintainRoomProject = getMaintainRoomProject(room.name);
            maintainRoomProject.run();
            console.log(room.name, JSON.stringify(maintainRoomProject.stats));
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        maintainRoom: DiagramMemory;
    }
}
