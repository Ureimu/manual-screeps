import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep): state {
    const source = getMidpointObjects(creep, LOOK_SOURCES)[0];

    const ifHarvesting = creep.store.getFreeCapacity() !== 0;
    if (ifHarvesting) {
        if (Game.time % 20 === 0) {
            creep.moveTo(source, { range: 1 });
        }
        creep.harvest(source);
        return "arrived";
    } else {
        return "moving";
    }
}

export const harvestSource: CreepAction = {
    run,
    name: "harvestSource",
    description: "挖能量矿",
    type: "stay"
};
