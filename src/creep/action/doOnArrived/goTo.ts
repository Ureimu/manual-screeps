import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    return "moving";
}

export const goTo: CreepAction = {
    run,
    name: "goTo",
    description: "前往",
    type: "stay"
};
