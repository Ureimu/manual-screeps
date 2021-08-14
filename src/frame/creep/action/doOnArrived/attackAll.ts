import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const spawnTargets = creep.room.find(FIND_HOSTILE_SPAWNS);
    const creepTargets = creep.room.find(FIND_HOSTILE_CREEPS);
    const closestTarget = 0;
    const closestSpawnTarget = creep.pos.findClosestByRange(spawnTargets);
    if (closestTarget) {
        if (!creep.pos.inRangeTo(closestTarget, 1)) {
            creep.moveTo(closestTarget, {
                range: 1,
                visualizePathStyle: {
                    stroke: "#ffffff"
                },
                ignoreCreeps: false
            });
        } else {
            // if (closestTarget.pos.lookFor(LOOK_STRUCTURES).filter(s => s.structureType === "rampart").length === 0) {
            //     creep.attack(closestTarget);
            // } else {
            //     const another = creep.pos.findClosestByRange(
            //         creepTargets.splice(
            //             creepTargets.findIndex(c => c.name === closestTarget.name),
            //             1
            //         )
            //     );
            //     if (another) creep.attack(another);
            // }
        }
        return "arrived";
    } else if (closestSpawnTarget) {
        if (!creep.pos.inRangeTo(closestSpawnTarget, 1)) {
            creep.moveTo(closestSpawnTarget, {
                range: 1,
                visualizePathStyle: {
                    stroke: "#ffffff"
                },
                ignoreCreeps: false
            });
        } else {
            creep.attack(closestSpawnTarget);
        }
        return "arrived";
    } else {
        return "moving";
    }
}

export const attackAll: CreepAction = {
    run,
    name: "attackAll",
    description: "攻击",
    type: "move"
};
