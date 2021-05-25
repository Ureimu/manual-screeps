import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { DiagramMemory } from "utils/ProjectNetworkDiagram/type";
import { runTasks } from "./taskRelation";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom)
                room.memory.AIUreium = { maintainRoom: {} };
            runTasks(room);
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface RoomMemory {
        AIUreium: {
            maintainRoom: DiagramMemory;
        };
    }
}
