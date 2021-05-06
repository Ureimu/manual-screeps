import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const constructionSite = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 3);

    const ifBuild = creep.store[RESOURCE_ENERGY] !== 0;
    if (ifBuild) {
        creep.build(constructionSite[0]);
        return "arrived";
    } else {
        return "moving";
    }
}

export const buildInRange: CreepAction = {
    run,
    name: "build",
    description: "建造建筑",
    type: "stay"
};
