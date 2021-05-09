import colorful from "utils/console/colorful";
import { stateCut } from "utils/stateCut/utils";
import { carrySourceAndFillStagePlan } from "./maintain/carrySourceAndFill";
import { harvestSourceStagePlan } from "./maintain/harvestSource";
import { upgradeControllerStagePlan } from "./maintain/upgradeController";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            const taskList: Record<string, Parameters<typeof stateCut>[1]> = {
                harvestSourceStagePlan,
                carrySourceAndFillStagePlan,
                upgradeControllerStagePlan
            };
            if (!room.memory.ai) room.memory.ai = { maintainRoom: [] };
            let taskListIndex = 0;
            for (const taskListName in taskList) {
                const element = taskList[taskListName];
                stateCut(room.memory.ai.maintainRoom, element, [room], taskListIndex, (name, index, description) => {
                    if (description !== "endState") {
                        console.log(
                            colorful(
                                `[maintainRoom]${room.name} ${taskListName}进入 ${index} 阶段` + "\n" + description,
                                "blue"
                            )
                        );
                    } else {
                        console.log(colorful(`[maintainRoom]${room.name} ${taskListName} 计划已经全部完成。`, "blue"));
                    }
                });
                taskListIndex++;
            }
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface RoomMemory {
        ai: {
            maintainRoom: (number | string)[];
        };
    }
}
