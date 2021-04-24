import { state } from "..";

export function signController(creep: Creep): state {
    const controller = creep.room.controller as StructureController;

    const ifSignController = controller.sign && controller.sign.username !== creep.owner.username;
    if (ifSignController) {
        creep.signController(controller, "test");
        return "arrived";
    } else {
        return "moving";
    }
}
