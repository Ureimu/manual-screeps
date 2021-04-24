import { PosStr } from "utils/RoomPositionToStr";
import { state } from ".";

export function moveCreep(creep: Creep): state {
    const routeInfo = creep.memory.route;
    const routeDetail = Memory.routes[routeInfo.name].routeDetailArray[routeInfo.index];
    const destination = PosStr.getPosFromStr(routeDetail.pathMidpointPos);
    if (creep.pos.inRangeTo(destination, routeDetail.range)) return "arrived";
    creep.moveTo(destination, { range: routeDetail.range });
    return "moving";
}
