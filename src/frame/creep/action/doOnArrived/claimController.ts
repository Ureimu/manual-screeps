import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const controller = creep.room.controller as StructureController;

    creep.claimController(controller);
    return "arrived";
}

export const claimController: CreepAction = {
    run,
    name: "claimController",
    description: "占领控制器",
    type: "stay"
};
