import { RouteConditionDetail } from "creep/routePlan/form";
import { state } from ".";
import { switchDoWhenCondition } from "./doOnJudgeCondition";

export function judgeCondition(creep: Creep, routeDetail: RouteConditionDetail): state {
    if (routeDetail.condition) {
        return switchDoWhenCondition(routeDetail, creep);
    } else {
        const routeInfo = creep.memory.route;
        routeInfo.index = (routeInfo.index + 1) % Memory.routes[routeInfo.name].routeDetailArray.length;
        return "moving";
    }
}
