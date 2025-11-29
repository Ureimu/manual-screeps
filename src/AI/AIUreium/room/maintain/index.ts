import { carryMineral } from "AI/AIUreium/control/carryMineral";
import { fillTower } from "AI/AIUreium/control/fillTower";
import { processPower } from "AI/AIUreium/control/processPower";
import { roomCarry } from "AI/AIUreium/control/roomCarry";
import { DiagramMemory } from "utils/Project/type";
import { initAiUreimuRoomMemory } from "../utils";
import { getMaintainRoomProject } from "./taskRelation";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom)
                room.memory.AIUreium = initAiUreimuRoomMemory();
            const maintainRoomProject = getMaintainRoomProject(room.name);
            maintainRoomProject.run();
            // console.log(room.name, JSON.stringify(maintainRoomProject.stats));
            if (Game.time % 50 === 0) {
                processPower(room);
                carryMineral(room);
                fillTower(room);
            }
            roomCarry(room);
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        maintainRoom?: DiagramMemory;
    }
}
