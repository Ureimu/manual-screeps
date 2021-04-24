import { state } from ".";
import { switchDoWhenArrive } from "./doOnArrived";

export function doStuff(creep: Creep): state {
    const routeInfo = creep.memory.route;
    const route = Memory.routes[routeInfo.name];
    const routeDetail = route.routeDetailArray[routeInfo.index];
    // const destination = PosStr.getPosFromStr(Memory.routes[routeInfo.name][routeInfo.index].pathMidpointPos);
    // if (creep.pos.inRangeTo(destination, 1)) return "arrived";
    // creep.moveTo(destination);
    const creepRouteState = switchDoWhenArrive(routeDetail, creep);
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
