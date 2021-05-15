import { RouteMidpointDetail } from "creep/routePlan/type";
import { state } from ".";
import { switchDoWhenArrive } from "./doOnArrived";

export function doStuff(creep: Creep, routeDetail: RouteMidpointDetail): state {
    const creepRouteState = switchDoWhenArrive(routeDetail, creep);
    const routeInfo = creep.memory.route;
    const route = Memory.routes[routeInfo.name];
    if (creepRouteState === "moving") {
        if (route.ifLoop === false) {
            routeInfo.index = routeInfo.index + 1;
            if (routeInfo.index >= Memory.routes[routeInfo.name].routeDetailArray.length) {
                return "end";
            }
        } else {
            routeInfo.index = (routeInfo.index + 1) % Memory.routes[routeInfo.name].routeDetailArray.length;
        }
    }
    return creepRouteState;
}
