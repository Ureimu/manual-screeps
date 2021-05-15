import { isRouteMidpointDetail, RouteMidpointDetail } from "creep/routePlan/type";
import { PosStr } from "utils/RoomPositionToStr";
import { actionIndexedList } from "../doOnArrived";
import { CostMatrixOpts } from "./getCostMatrix";

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

export const emptyRouteCacheDetail: routeCacheDetail = {
    route: "",
    time: 0,
    origin: "",
    dest: ""
};

export function createRouteCache(
    startRouteDetail: RouteMidpointDetail,
    endRouteDetail: RouteMidpointDetail,
    creepPos: RoomPosition
): routeCacheDetail {
    const type = actionIndexedList[startRouteDetail.doWhenArrive].type;
    if (type === "stay" && isRouteMidpointDetail(endRouteDetail) && startRouteDetail.range !== 0) {
        // 进行路径缓存
        const startPointPosStr = PosStr.setPosToStr(creepPos);
        const endPointPosStr = endRouteDetail.pathMidpointPos;
        const startPoint = creepPos;
        const endPoint = PosStr.getPosFromStr(endPointPosStr);

        if (startPoint.roomName === endPoint.roomName && startPointPosStr !== endPointPosStr) {
            // 如果缓存时间很长则刷新缓存
            if (
                global.routeCache?.[startPointPosStr]?.[endPointPosStr]?.time &&
                Game.time - global.routeCache[startPointPosStr][endPointPosStr].time > 10000
            ) {
                global.routeCache[startPointPosStr][endPointPosStr] = emptyRouteCacheDetail;
            }
            //
            if (!global.routeCache?.[startPointPosStr]?.[endPointPosStr]) {
                if (!global.routeCache) global.routeCache = {};
                if (!global.routeCache[startPointPosStr]) global.routeCache[startPointPosStr] = {};
                const cacheCheck = global.routeCache[startPointPosStr][endPointPosStr];
                if (!cacheCheck || cacheCheck.time === 0) {
                    global.routeCache[startPointPosStr][endPointPosStr] = emptyRouteCacheDetail;
                }
                const cache = global.routeCache[startPointPosStr][endPointPosStr];
                const path = startPoint.findPathTo(endPoint, {
                    range: endRouteDetail.range,
                    ignoreCreeps: true,
                    ...CostMatrixOpts
                });
                if (path.length > 0) {
                    const dest = PosStr.genePosStr(
                        path[path.length - 1].x,
                        path[path.length - 1].y,
                        startPoint.roomName
                    );
                    cache.route = Room.serializePath(path);
                    cache.time = Game.time;
                    cache.origin = startPointPosStr;
                    cache.dest = dest;
                }
            }
        }
        return global.routeCache?.[startPointPosStr]?.[endPointPosStr]
            ? global.routeCache[startPointPosStr][endPointPosStr]
            : emptyRouteCacheDetail;
    }
    return emptyRouteCacheDetail;
}
