import colorful from "utils/console/colorful";
import { stateCut } from "utils/stateCut/utils";
import { carrySourceAndFillStagePlan } from "./maintain/carrySourceAndFill";
import { harvestSourceStagePlan } from "./maintain/harvestSource";
import { upgradeControllerStagePlan } from "./maintain/upgradeController";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            const taskList = [harvestSourceStagePlan, carrySourceAndFillStagePlan, upgradeControllerStagePlan];
            if (!room.memory.ai) room.memory.ai = { maintainRoom: [] };
            for (let index = 0; index < taskList.length; index++) {
                const element = taskList[index];
                stateCut(room.memory.ai.maintainRoom, element, [room], index, (name, index, description) => {
                    if (description !== "end") {
                        console.log(
                            colorful(
                                `[maintainRoom]${room.name} ${name}进入第${index + 1}阶段` + "\n" + description,
                                "blue"
                            )
                        );
                    } else {
                        console.log(colorful(`[maintainRoom]${room.name} ${name}阶段计划已经全部完成。`, "blue"));
                    }
                });
            }
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface RoomMemory {
        ai: {
            maintainRoom: number[];
        };
    }
}
