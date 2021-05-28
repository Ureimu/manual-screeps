import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    if (!conditionArgs) throw new Error("错误使用store:没有给定参数");
    const [structurePosStr, resourceType, sign, amount] = conditionArgs;
    const structure = PosStr.getPosFromStr(structurePosStr).lookFor(LOOK_STRUCTURES)[0] as AnyStoreStructure;
    let flag = false;
    if (sign === ">=") {
        flag = structure.store[resourceType as ResourceConstant] >= Number(amount);
    } else if (sign === "<=") {
        flag = structure.store[resourceType as ResourceConstant] <= Number(amount);
    } else if (sign === "==") {
        flag = structure.store[resourceType as ResourceConstant] === Number(amount);
    } else {
        throw new Error("错误使用store:只接受>=,==和<=作为符号参数");
    }
    if (flag) return ["moving", "jump"];
    else return ["moving", "notJump"];
}

export const store: CreepCondition = {
    run,
    name: "store",
    description: "拿出能量"
};
