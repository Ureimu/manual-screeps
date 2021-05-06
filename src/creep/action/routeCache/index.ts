import { isRouteMidpointDetail, RouteMidpointDetail } from "creep/routePlan";
import { PosStr } from "utils/RoomPositionToStr";
import { actionIndexedList } from "../doOnArrived";

declare global {
    namespace NodeJS {
        interface Global {
            routeCache: {
                [origin: string]: { [destination: string]: routeCacheDetail };
            };
            creepMemory: { [creepName: string]: routeCacheDetail };
        }
    }
}

export interface routeCacheDetail {
    route: string;
    time: number;
    origin: string;
    dest: string;
}

export function createRouteCache(
    startRouteDetail: RouteMidpointDetail,
    endRouteDetail: RouteMidpointDetail,
    creepPos: RoomPosition
): routeCacheDetail {
    const type = actionIndexedList[startRouteDetail.doWhenArrive].type;
    const emptyDetail: routeCacheDetail = {
        route: "",
        time: 0,
        origin: "",
        dest: ""
    };
    if (type === "stay" && isRouteMidpointDetail(endRouteDetail) && startRouteDetail.range !== 0) {
        // 进行路径缓存
        const startPointPosStr = PosStr.setPosToStr(creepPos);
        const endPointPosStr = endRouteDetail.pathMidpointPos;
        const startPoint = creepPos;
        const endPoint = PosStr.getPosFromStr(endPointPosStr);

        if (startPoint.roomName === endPoint.roomName) {
            // 如果缓存时间很长则刷新缓存
            if (
                global.routeCache?.[startPointPosStr]?.[endPointPosStr]?.time &&
                Game.time - global.routeCache[startPointPosStr][endPointPosStr].time > 10000
            ) {
                global.routeCache[startPointPosStr][endPointPosStr] = emptyDetail;
            }
            //
            if (!global.routeCache?.[startPointPosStr]?.[endPointPosStr]) {
                if (!global.routeCache) global.routeCache = {};
                if (!global.routeCache[startPointPosStr]) global.routeCache[startPointPosStr] = {};
                const cacheCheck = global.routeCache[startPointPosStr][endPointPosStr];
                if (!cacheCheck || cacheCheck.time === 0) {
                    global.routeCache[startPointPosStr][endPointPosStr] = emptyDetail;
                }
                const cache = global.routeCache[startPointPosStr][endPointPosStr];
                cache.route = Room.serializePath(startPoint.findPathTo(endPoint, { range: endRouteDetail.range }));
                cache.time = Game.time;
                cache.origin = startPointPosStr;
                cache.dest = endPointPosStr;
            }
        }
        return global.routeCache[startPointPosStr][endPointPosStr];
    }
    return emptyDetail;
}
