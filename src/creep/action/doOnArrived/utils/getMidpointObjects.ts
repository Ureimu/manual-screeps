import { RouteMidpointDetail } from "creep/routePlan/form";
import { PosStr } from "utils/RoomPositionToStr";

export function getMidpointObjects<T extends keyof AllLookAtTypes>(creep: Creep, type: T): AllLookAtTypes[T][] {
    const routeInfo = creep.memory.route;
    const routeDetail = Memory.routes[routeInfo.name].routeDetailArray[routeInfo.index] as RouteMidpointDetail;
    const MidpointObjectsPos = PosStr.getPosFromStr(routeDetail.pathMidpointPos);
    return MidpointObjectsPos.lookFor(type);
}
