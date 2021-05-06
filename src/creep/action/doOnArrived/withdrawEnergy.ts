import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep, actionArgs?: string[]): state {
    const storableObject = getMidpointObjects(creep, LOOK_STRUCTURES)[0];
    if (actionArgs) {
        const [ifFill] = actionArgs;
        if (ifFill === "false" ? false : true) {
            return fillCapacity(creep, storableObject);
        } else {
            return tryWithdraw(creep, storableObject);
        }
    } else {
        return fillCapacity(creep, storableObject);
    }
}

function fillCapacity(creep: Creep, storableObject: Structure<StructureConstant>): state {
    const ifWithdrawing = creep.store.getFreeCapacity() !== 0;
    if (ifWithdrawing) {
        creep.withdraw(storableObject, RESOURCE_ENERGY);
        return "arrived";
    } else {
        return "moving";
    }
}

function tryWithdraw(creep: Creep, storableObject: Structure<StructureConstant>): state {
    // console.log("tryWithdraw");
    creep.withdraw(storableObject, RESOURCE_ENERGY);
    return "moving";
}

export const withdrawEnergy: CreepAction = {
    run,
    name: "withdrawEnergy",
    description: "拿出能量",
    type: "stay"
};
