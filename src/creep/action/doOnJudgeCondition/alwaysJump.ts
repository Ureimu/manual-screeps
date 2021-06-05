import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    return ["moving", "jump"];
}

export const alwaysJump: CreepCondition = {
    run,
    name: "alwaysJump",
    description: "无条件跳转"
};
