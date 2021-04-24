import { state } from "..";

export function upgradeController(creep: Creep): state {
    const controller = creep.room.controller;

    const ifUpgradeController = creep.store.getUsedCapacity() === 0;
    if (ifUpgradeController) {
        creep.upgradeController(controller as StructureController);
        return "arrived";
    } else {
        return "moving";
    }
}
