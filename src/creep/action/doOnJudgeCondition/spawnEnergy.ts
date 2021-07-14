import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    if (!conditionArgs) throw new Error("错误使用store:没有给定参数");
    const [sign, amount] = conditionArgs;
    const capacity = creep.room.energyCapacityAvailable;
    const factAmount = creep.room.energyAvailable;
    let flag = false;
    if (sign === "full") {
        flag = capacity - factAmount === 0;
    } else if (sign === "empty") {
        flag = factAmount === 0;
    } else if (sign === "notFull") {
        flag = capacity - factAmount !== 0;
    } else if (sign === "notEmpty") {
        flag = capacity - factAmount !== 0;
    } else if (sign === ">=") {
        flag = factAmount >= Number(amount);
    } else if (sign === "==") {
        flag = factAmount === Number(amount);
    } else if (sign === "<=") {
        flag = factAmount <= Number(amount);
    } else {
        throw new Error("错误使用spawnEnergy:只接受full和empty,notFull和notEmpty,>=,==,<=作为符号参数");
    }
    if (flag) return ["moving", "jump"];
    else return ["moving", "notJump"];
}

export const spawnEnergy: CreepCondition = {
    run,
    name: "spawnEnergy",
    description: "spawn的能量值"
};
