import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep): state {
    const storableObject = getMidpointObjects(creep, LOOK_STRUCTURES)[0];

    const ifWithdrawing = creep.store[RESOURCE_ENERGY] !== 0;
    if (ifWithdrawing) {
        creep.transfer(storableObject, RESOURCE_ENERGY);
        return "arrived";
    } else {
        return "moving";
    }
}

export const transferEnergy: CreepAction = {
    run,
    name: "transferEnergy",
    description: "放入能量",
    type: "stay"
};
