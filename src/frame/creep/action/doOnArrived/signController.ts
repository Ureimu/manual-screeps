import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const controller = creep.room.controller as StructureController;

    const ifSignController = controller.sign && controller.sign.username !== creep.owner.username;
    if (ifSignController) {
        creep.signController(controller, "test");
        return "arrived";
    } else {
        return "moving";
    }
}

export const signController: CreepAction = {
    run,
    name: "signController",
    description: "给控制器签名",
    type: "stay"
};
