import { chooseSource } from "AI/AIUreium/control/outwardsSource";
import { maintainRoad } from "AI/AIUreium/control/outwardsSource/maintainRoad";
import { switchBody } from "AI/AIUreium/control/outwardsSource/switchBody";
import { watchInvader } from "AI/AIUreium/control/outwardsSource/watchInvader";
import { DiagramMemory } from "utils/Project/type";
import { initAiUreimuRoomMemory } from "../utils";
import { getOutwardsHarvestProject } from "./taskRelation";
// 如果外矿没有正常运作，可能是第一个spawn没有放到正确位置。
// TODO buildRoadInterval放入配置表
const buildRoadInterval = 20000;
const switchBodyInterval = 100;
export function maintainOutwardsSource(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom) {
                room.memory.AIUreium = initAiUreimuRoomMemory();
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

                    if (sourceData && (Game.time - sourceData.startTime) % buildRoadInterval === 0) {
                        maintainRoad(room.name, sourceRoomName, sourceName);
                    }

                    if (sourceData && (Game.time - sourceData.startTime) % switchBodyInterval === 0) {
                        switchBody(room.name, sourceRoomName, sourceName);
                    }
                }
                watchInvader(sourceRoomName);
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
