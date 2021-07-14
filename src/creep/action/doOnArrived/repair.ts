import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const targets = creep.room
        .find(FIND_STRUCTURES)
        .filter(
            structure =>
                structure.structureType !== "constructedWall" &&
                structure.structureType !== "rampart" &&
                structure.hitsMax - structure.hits > 2000 &&
                (structure.structureType !== "container" ||
                    (structure.structureType === "container" && structure.hitsMax - structure.hits >= 1.5e4))
        );
    const wallTargets = creep.room
        .find(FIND_STRUCTURES)
        .filter(structure => structure.structureType === "constructedWall" || structure.structureType === "rampart");
    const ifWork = creep.store[RESOURCE_ENERGY] !== 0 && targets.length > 0;
    if (ifWork) {
        return repairStructure(creep, targets, wallTargets);
    } else {
        return "moving";
    }
}

function repairStructure(creep: Creep, targetsToFix: AnyStructure[], wallTargets: AnyStructure[]): state {
    if (!global.creepMemory[creep.name]) global.creepMemory[creep.name] = {};
    if (!global.creepMemory[creep.name].lastRenovate) {
        const targets = targetsToFix
            .sort((a, b) => a.hits - b.hits)
            .concat(wallTargets.sort((a, b) => a.hits - b.hits));
        if (targets.length > 0) {
            global.creepMemory[creep.name].lastRenovate = targets[0].id;
            global.creepMemory[creep.name].lastRenovateHit = targets[0].hits;
            if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: "#ffaa00"
                    }
                });
            }
            return "arrived";
        } else {
            return "moving";
        }
    } else if (global.creepMemory[creep.name].lastRenovate) {
        const targetX = Game.getObjectById<AnyStructure>(
            global.creepMemory[creep.name].lastRenovate as Id<AnyStructure>
        );
        if (!targetX) {
            global.creepMemory[creep.name].lastRenovate = undefined;
        } else {
            if (
                targetX.hits >= (global.creepMemory[creep.name].lastRenovateHit as number) + 1e6 ||
                targetX.hits === targetX.hitsMax
            ) {
                global.creepMemory[creep.name].lastRenovate = undefined;
            } else if (creep.repair(targetX) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetX, {
                    visualizePathStyle: {
                        stroke: "#ffaa00"
                    }
                });
            }
        }
        return "arrived";
    } else {
        creep.say("error");
        return "arrived";
    }
}

export const repair: CreepAction = {
    run,
    name: "repair",
    description: "修复建筑",
    type: "move"
};

declare global {
    interface GlobalCreepMemory {
        lastRenovate?: string;
        lastRenovateHit?: number;
    }
}
