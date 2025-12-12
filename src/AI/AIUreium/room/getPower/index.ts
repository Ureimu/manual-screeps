import { choosePowerBank } from "AI/AIUreium/control/getPower/choosePowerBank";
import { runProjectCreeps } from "frame/creep";
import { registerFN } from "utils/profiler";
import { DiagramMemory } from "utils/Project/type";
import { initAiUreimuRoomMemory } from "../utils";
import { getGetPowerProject } from "./taskRelation";
import { getPowerProjectMemoryType, getPowerProjectName, getPowerProjectRunInterval } from "./type";

export const runGetPower = registerFN((room: Room): void => {
    runProjectCreeps(room, getPowerProjectName);
    if (Game.time % getPowerProjectRunInterval === 0) {
        if (!room.memory.AIUreium || !room.memory.AIUreium.getPower) {
            room.memory.AIUreium = initAiUreimuRoomMemory();
        }
        const getPowerData = room.memory.AIUreium.getPowerData;
        if (getPowerData) {
            if ((Game.time - getPowerData.startTime) % 150 === 0) {
                choosePowerBank(room);
            }
        }
        for (const powerBankRoomName in room.memory.AIUreium.getPower) {
            for (const powerBankId in room.memory.AIUreium.getPower[powerBankRoomName]) {
                getGetPowerProject(room.name, powerBankRoomName, powerBankId).run();
            }
        }
    }
}, "runGetPower");

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        getPower: { [powerBankRoomName: string]: { [powerBankId: string]: DiagramMemory<getPowerProjectMemoryType> } };
    }
}
