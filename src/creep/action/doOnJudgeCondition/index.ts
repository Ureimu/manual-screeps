import { RouteConditionDetail } from "creep/routePlan/type";
import { conditionState, state } from "..";
import { alwaysJump } from "./alwaysJump";
import { creepStore } from "./creepStore";
import { creepTimeToLive } from "./creepTimeToLive";
import { store } from "./store";

export interface CreepCondition {
    run: (creep: Creep, conditionArgs?: string[]) => [state, conditionState];
    name: string;
    description: string;
}

export const conditionIndexedList = { store, creepStore, creepTimeToLive, alwaysJump };

export function switchDoWhenCondition(routeDetail: RouteConditionDetail, creep: Creep): state {
    if (conditionIndexedList[routeDetail.condition]) {
        const stateHere = conditionIndexedList[routeDetail.condition].run(
            creep,
            routeDetail.conditionArgs ? routeDetail.conditionArgs.split(",") : undefined
        );
        if (stateHere[1] === "jump") {
            const routeInfo = creep.memory.route;
            if (typeof routeDetail.jumpTo === "string") {
                if (routeDetail.jumpTo === "front") {
                    creep.memory.route.index = 0;
                } else {
                    creep.memory.route.index = Memory.routes[routeInfo.name].routeDetailArray.length - 1;
                }
            } else {
                creep.memory.route.index = routeDetail.jumpTo + creep.memory.route.index;
                if (
                    creep.memory.route.index < 0 ||
                    creep.memory.route.index >= Memory.routes[routeInfo.name].routeDetailArray.length
                )
                    throw new Error(
                        `route索引超出限制，请检查route:${routeInfo.name}的${
                            creep.memory.route.index - routeDetail.jumpTo
                        }条件跳转值`
                    ); // 跳转是相对位置
            }
        }
        if (stateHere[0] === "moving" && stateHere[1] !== "jump") {
            const routeInfo = creep.memory.route;
            routeInfo.index = (routeInfo.index + 1) % Memory.routes[routeInfo.name].routeDetailArray.length;
        }
        return stateHere[0];
    } else {
        console.log(`${routeDetail.condition} 不在CreepCondition预设值内`);
        return "arrived";
    }
}
