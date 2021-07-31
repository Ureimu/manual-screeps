// TODO 完成内容
import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    if (!conditionArgs) throw new Error("错误使用creepTimeToLive:没有给定参数");
    if (!creep.ticksToLive) return ["moving", "notJump"];
    const [sign, amount] = conditionArgs;

    let flag = false;
    if (sign === ">=") {
        flag = creep.ticksToLive >= Number(amount);
    } else if (sign === "<=") {
        flag = creep.ticksToLive <= Number(amount);
    } else if (sign === "==") {
        flag = creep.ticksToLive === Number(amount);
    } else {
        throw new Error("错误使用creepTimeToLive:只接受>=,==和<=作为符号参数");
    }
    if (flag) return ["moving", "jump"];
    else return ["moving", "notJump"];
}

export const creepTimeToLive: CreepCondition = {
    run,
    name: "creepTimeToLive",
    description: `creep剩余生命。
参数：1.">="|"<="|"=="
2.number
如输入参数为">=,10"表示当creep剩余存活时间大于等于10时会触发跳转`
};
