import { CreepAction } from ".";
import { state } from "..";
import { runningCounter } from "./utils/runningCounter";

function run(creep: Creep): state {
    if (creep.room.energyCapacityAvailable === creep.room.energyAvailable) return "moving";
    const targets = creep.room.find(FIND_STRUCTURES, {
        // 标明房间内未装满的扩展和出生点
        filter: structure => {
            return (
                (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        }
    });
    const ifFill = creep.store[RESOURCE_ENERGY] !== 0 && targets.length > 0;
    if (ifFill) {
        const closestTarget = creep.pos.findClosestByRange(targets);
        if (closestTarget) {
            if (!creep.pos.inRangeTo(closestTarget, 1)) {
                creep.moveTo(closestTarget, {
                    range: 1,
                    visualizePathStyle: {
                        stroke: "#ffffff"
                    }
                });
            } else {
                creep.transfer(closestTarget, "energy");
                const index = targets.findIndex(value => value.pos.isEqualTo(closestTarget));
                targets.splice(index, 1);
                const secondClosestTarget = creep.pos.findClosestByRange(targets);
                if (secondClosestTarget) {
                    if (!creep.pos.inRangeTo(secondClosestTarget, 1)) {
                        creep.moveTo(secondClosestTarget, {
                            range: 1,
                            visualizePathStyle: {
                                stroke: "#ffffff"
                            }
                        });
                    }
                }
            }
        }
        return "arrived";
    } else {
        if (runningCounter(creep, "fillSpawnAndExtension") % 2 === 1) return "moving";
        return "arrived";
    }
}

export const fillSpawnAndExtension: CreepAction = {
    run,
    name: "fillSpawnAndExtension",
    description: "建造建筑",
    type: "move"
};
