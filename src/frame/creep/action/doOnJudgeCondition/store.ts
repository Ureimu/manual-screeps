import { PosStr } from "utils/RoomPositionToStr";
import { CreepCondition } from ".";
import { conditionState, state } from "..";

function run(creep: Creep, conditionArgs?: string[]): [state, conditionState] {
    if (!conditionArgs) throw new Error("错误使用store:没有给定参数");
    const [structurePosStr, resourceType, sign, amount] = conditionArgs;
    const pos = PosStr.getPosFromStr(structurePosStr);
    let resourceNumber = 0;
    const structure = pos.lookFor(LOOK_STRUCTURES)[0] as AnyStoreStructure;
    if (existStoredResource(structure, resourceType)) {
        resourceNumber = structure.store[resourceType as ResourceConstant];
    } else {
        const droppedResource = pos
            .lookFor(LOOK_RESOURCES)
            .filter(resource => resource.resourceType === resourceType)[0];
        if (droppedResource) resourceNumber = droppedResource.amount;
        else {
            const ruin = pos.lookFor(LOOK_RUINS)[0];
            if (existStoredResource(ruin, resourceType)) resourceNumber = ruin.store[resourceType as ResourceConstant];
            else {
                const tombStone = pos.lookFor(LOOK_TOMBSTONES)[0];
                if (existStoredResource(tombStone, resourceType))
                    resourceNumber = tombStone.store[resourceType as ResourceConstant];
            }
        }
    }

    let flag = false;
    if (sign === ">=") {
        flag = resourceNumber >= Number(amount);
    } else if (sign === "<=") {
        flag = resourceNumber <= Number(amount);
    } else if (sign === "==") {
        flag = resourceNumber === Number(amount);
    } else {
        throw new Error("错误使用store:只接受>=,==和<=作为符号参数");
    }
    if (flag) return ["moving", "jump"];
    else return ["moving", "notJump"];
}

export const store: CreepCondition = {
    run,
    name: "store",
    description: `建筑存储的资源情况。
参数：1.string,格式为x0y0rW1N1(即x坐标，y坐标和房间名称),为建筑的坐标
2.string,资源的类型对应字符串,如能量对应"energy"
3.">="|"<="|"=="
4.number`
};

function existStoredResource(storableObject: { store: Store<ResourceConstant, false> }, resourceType: string) {
    if (storableObject?.store?.[resourceType as ResourceConstant]) return true;
    else return false;
}
