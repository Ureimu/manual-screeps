import { runProjectCreeps } from "frame/creep";
import { registerFN } from "utils/profiler";
import { initAiUreimuRoomMemory } from "../utils";
import { getNewRoomProject } from "./taskRelation";
import { newRoomProjectName } from "./type";

export const maintainNewRoom = registerFN((room: Room): void => {
    runProjectCreeps(room, newRoomProjectName);
    if (Game.time % 5 === 0) {
        if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom) {
            room.memory.AIUreium = initAiUreimuRoomMemory();
        }
        for (const claimRoomName in room.memory.AIUreium.newRoom) {
            getNewRoomProject(room.name, claimRoomName).run();
        }
    }
}, "maintainNewRoom");
