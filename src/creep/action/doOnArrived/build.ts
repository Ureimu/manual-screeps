import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    const ifBuild = creep.store[RESOURCE_ENERGY] !== 0 && targets.length > 0;
    if (ifBuild) {
        const closestTarget = creep.pos.findClosestByRange(targets);
        if (closestTarget) {
            if (creep.pos.isEqualTo(closestTarget.pos)) {
                // 避免卡住constructionSites
                // creep.move(_.random(1, 8) as DirectionConstant); // 随机移动
            }
            if (Game.time % 40 === 0) console.log(`${closestTarget.progressTotal}:${closestTarget.progress}`);
            if (!creep.pos.inRangeTo(closestTarget, 3)) {
                creep.moveTo(closestTarget, {
                    range: 3,
                    visualizePathStyle: {
                        stroke: "#ffffff"
                    }
                });
            } else {
                creep.build(closestTarget);
            }
        }
        return "arrived";
    } else {
        return "moving";
    }
}

export const build: CreepAction = {
    run,
    name: "build",
    description: "建造建筑",
    type: "move"
};
