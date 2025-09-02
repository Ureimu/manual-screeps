import { CreepAction } from ".";
import { state } from "..";
import { stayCloseToWorkSpot } from "./utils/stayCloseToWorkSpot";

function run(creep: Creep): state {
    const controller = creep.room.controller;
    if (!controller) {
        return "moving";
    }

    stayCloseToWorkSpot(creep, controller.pos, 3);
    const ifUpgradeController = creep.store[RESOURCE_ENERGY] !== 0;
    if (ifUpgradeController) {
        creep.upgradeController(controller as StructureController);
        return "arrived";
    } else {
        return "moving";
    }
}

export const upgradeController: CreepAction = {
    run,
    name: "upgradeController",
    description: "升级控制器",
    type: "stay"
};
