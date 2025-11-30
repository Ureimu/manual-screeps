import { carryMineral } from "AI/AIUreium/control/carryMineral";
import { fillTower } from "AI/AIUreium/control/fillTower";
import { processPower } from "AI/AIUreium/control/processPower";
import { roomCarry } from "AI/AIUreium/control/roomCarry";
import { runProjectCreeps } from "frame/creep";
import { registerFN } from "utils/profiler";
import { DiagramMemory } from "utils/Project/type";
import { initAiUreimuRoomMemory } from "../utils";
import { getMaintainRoomProject } from "./taskRelation";
import { maintainRoomProjectName } from "./type";

export const maintainRoom = registerFN((room: Room): void => {
    runProjectCreeps(room, maintainRoomProjectName);
    if (Game.time % 5 === 0) {
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
}, "maintainRoom");

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        maintainRoom?: DiagramMemory;
    }
}
