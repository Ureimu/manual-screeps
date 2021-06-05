import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { runningCounter } from "./utils/runningCounter";

function run(creep: Creep): state {
    return runningCounter(creep);
}

export const pause: CreepAction = {
    run,
    name: "pause",
    description: "暂停",
    type: "stay"
};
