import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
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
            }
        }
        return "arrived";
    } else {
        return "moving";
    }
}

export const fillSpawnAndExtension: CreepAction = {
    run,
    name: "fillSpawnAndExtension",
    description: "建造建筑",
    type: "move"
};
