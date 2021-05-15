import { RouteConditionDetail } from "creep/routePlan/type";
import { state } from "..";

export interface CreepCondition {
    run: (creep: Creep, conditionArgs?: string[]) => state;
    name: string;
    description: string;
    type: "move" | "stay";
}

export const conditionIndexedList: { [name: string]: CreepCondition } = {};

export function switchDoWhenCondition(routeDetail: RouteConditionDetail, creep: Creep): state {
    if (conditionIndexedList[routeDetail.condition]) {
        creep.memory.route.index = routeDetail.jumpTo;
        const state = conditionIndexedList[routeDetail.condition].run(
            creep,
            routeDetail.conditionArgs ? routeDetail.conditionArgs.split(",") : undefined
        );
        return state;
    } else {
        console.log(`${routeDetail.condition} 不在CreepCondition预设值内`);
        return "arrived";
    }
}
