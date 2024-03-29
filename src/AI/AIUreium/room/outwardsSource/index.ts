import { chooseSource } from "AI/AIUreium/mainControl/outwardsSource";
import { DiagramMemory } from "utils/Project/type";
import { getOutwardsHarvestProject } from "./taskRelation";
// 如果外矿没有正常运作，可能是第一个spawn没有放到正确位置。
export function maintainOutwardsSource(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom) {
                room.memory.AIUreium = { maintainRoom: {}, outwardsSource: {}, newRoom: {} };
            }
            const sourceData = room.memory.AIUreium.outwardsSourceData;
            if (sourceData) {
                if ((Game.time - sourceData.startTime) % 150 === 0) {
                    chooseSource(room);
                }
            }
            for (const sourceRoomName in room.memory.AIUreium.outwardsSource) {
                for (const sourceName in room.memory.AIUreium.outwardsSource[sourceRoomName]) {
                    getOutwardsHarvestProject(room.name, sourceRoomName, sourceName).run();
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
