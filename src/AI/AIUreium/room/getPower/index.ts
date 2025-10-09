import { choosePowerBank } from "AI/AIUreium/mainControl/getPower/choosePowerBank";
import { DiagramMemory } from "utils/Project/type";
import { initAiUreimuRoomMemory } from "../utils";
import { getGetPowerProject } from "./taskRelation";

export function runGetPower(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my) {
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
    });
}

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        getPower: { [powerBankRoomName: string]: { [powerBankId: string]: DiagramMemory } };
    }
}
