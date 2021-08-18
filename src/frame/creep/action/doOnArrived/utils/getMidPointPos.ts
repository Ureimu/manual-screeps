import { RouteMidpointDetail } from "frame/creep/routePlan/type";
import { PosStr } from "utils/RoomPositionToStr";

export function getMidPointPos(creep: Creep): RoomPosition {
    return PosStr.getPosFromStr(
        (Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index] as RouteMidpointDetail)
            .pathMidpointPos
    );
}
