import { RouteMidpointDetail } from "creep/routePlan/type";
import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep, actionArgs?: string[]): state {
    if (!actionArgs) {
        console.log(colorful(`错误的使用keepOnHarvestingSource：没有传入source位置参数`, "red"));
        return "moving";
    }
    if (Game.time % 5 === 0) {
        const pos = PosStr.getPosFromStr(
            (Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index] as RouteMidpointDetail)
                .pathMidpointPos
        );
        creep.moveTo(pos);
    }

    const source = PosStr.getPosFromStr(actionArgs[0]).lookFor(LOOK_SOURCES)[0];
    creep.harvest(source);
    return "arrived";
}

export const keepOnHarvestingSource: CreepAction = {
    run,
    name: "keepOnHarvestingSource",
    description: "一直挖能量矿",
    type: "stay"
};
