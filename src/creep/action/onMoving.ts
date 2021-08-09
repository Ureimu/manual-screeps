import { RouteMidpointDetail } from "creep/routePlan/type";
import { PosStr } from "utils/RoomPositionToStr";
import { state } from ".";
import { CostMatrixOpts } from "./routeCache/getCostMatrix";

export function moveCreep(creep: Creep, routeDetail: RouteMidpointDetail): state {
    const destination = PosStr.getPosFromStr(routeDetail.pathMidpointPos);
    if (creep.pos.inRangeTo(destination, routeDetail.range)) return "arrived";
    // if (global.creepMemory[creep.name].route !== "") {
    //     const routeCache = global.creepMemory[creep.name];
    //     const moveByPathReturnCode = creep.moveByPath(routeCache.route);
    //     if (moveByPathReturnCode === ERR_NOT_FOUND) {
    //         creep.moveTo(PosStr.getPosFromStr(routeCache.origin), CostMatrixOpts);
    //     }
    //     if (moveByPathReturnCode !== OK && moveByPathReturnCode !== ERR_TIRED && moveByPathReturnCode !== ERR_NOT_FOUND)
    //         console.log(
    //             `creep ${creep.name} moving by path from ${routeCache.origin} to ${routeCache.dest} with error ${moveByPathReturnCode}`
    //         );
    // } else

    const code = creep.moveTo(destination, { range: routeDetail.range, ignoreCreeps: false });
    if (Game.time % 5 === 0 && creep.name === "W33N21SourceKeeper0") {
        console.log(
            `"moving!" + ${code} + ${routeDetail.range} + ${typeof routeDetail.range} + ${routeDetail.pathMidpointPos}`
        );
    }
    return "moving";
}
