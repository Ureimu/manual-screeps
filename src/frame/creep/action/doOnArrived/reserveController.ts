import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const controller = creep.room.controller as StructureController;

    creep.reserveController(controller);
    return "arrived";
}

export const reserveController: CreepAction = {
    run,
    name: "reserveController",
    description: "预定控制器",
    type: "stay"
};
