import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    if (!conditionArgs) throw new Error("错误使用store:没有给定参数");
    const [sign, amount] = conditionArgs;
    let flag = false;
    if (sign === "full") {
        flag = creep.store.getFreeCapacity() === 0;
    } else if (sign === "empty") {
        flag = creep.store.getUsedCapacity() === 0;
    } else if (sign === "notFull") {
        flag = creep.store.getFreeCapacity() === 0;
    } else if (sign === "notEmpty") {
        flag = creep.store.getUsedCapacity() === 0;
    } else if (sign === ">=") {
        flag = creep.store.getFreeCapacity() === 0;
    } else if (sign === "==") {
        flag = creep.store.getUsedCapacity() === 0;
    } else if (sign === "<=") {
        flag = creep.store.getFreeCapacity() === 0;
    } else if (!isNaN(Number(sign))) {
        flag = creep.store.getUsedCapacity() === Number(sign);
    } else {
        throw new Error("错误使用creepStore:只接受full和empty作为符号参数");
    }
    if (flag) return ["moving", "jump"];
    else return ["moving", "notJump"];
}

export const spawnEnergy: CreepCondition = {
    run,
    name: "spawnEnergy",
    description: "spawn的能量值"
};
