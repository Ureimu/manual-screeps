import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { runningCounter } from "./utils/runningCounter";

function run(creep: Creep): state {
    if (runningCounter(creep, "pause") % 2 === 1) return "moving";
    return "arrived";
}

export const pause: CreepAction = {
    run,
    name: "pause",
    description: "暂停",
    type: "stay"
};
