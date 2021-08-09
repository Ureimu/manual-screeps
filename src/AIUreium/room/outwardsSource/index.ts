import { chooseSource } from "AIUreium/mainControl/outwardsSource";
import { DiagramMemory } from "utils/Project/type";
import { getOutwardsHarvestProject } from "./taskRelation";

export function maintainOutwardsSource(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom) {
                room.memory.AIUreium = { maintainRoom: {}, outwardsSource: {} };
            }
            if (room.memory.AIUreium.outwardsSourceData) {
                if ((Game.time - room.memory.AIUreium.outwardsSourceData.startTime) % 1500 === 0) {
                    chooseSource(room);
                }
            }
            for (const sourceRoomName in room.memory.AIUreium.outwardsSource) {
                for (const sourceName in room.memory.AIUreium.outwardsSource[sourceRoomName]) {
                    getOutwardsHarvestProject(room.name, sourceRoomName, sourceName).runTasks();
                }
            }
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface AIUreiumRoomMemory {
        outwardsSource: { [sourceRoomName: string]: { [sourceName: string]: DiagramMemory } };
    }
}
