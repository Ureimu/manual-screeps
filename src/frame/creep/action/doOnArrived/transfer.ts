import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep, actionArgs?: string[]): state {
    if (!actionArgs) throw new Error("actionArgs needed");
    const [resourceType] = actionArgs as [ResourceConstant];
    const storableObject = getMidpointObjects(creep, LOOK_STRUCTURES)[0];

    const ifTransferring = creep.store.getUsedCapacity() !== 0;
    if (ifTransferring) {
        creep.transfer(storableObject, resourceType);
        return "arrived";
    } else {
        return "moving";
    }
}

export const transfer: CreepAction = {
    run,
    name: "transfer",
    description: "放入",
    type: "stay"
};
