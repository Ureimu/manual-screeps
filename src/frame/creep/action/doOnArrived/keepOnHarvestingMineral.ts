import { RouteMidpointDetail } from "frame/creep/routePlan/type";
import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { getMidPointPos } from "./utils/getMidPointPos";

function run(creep: Creep, actionArgs?: string[]): state {
    if (!actionArgs) {
        console.log(colorful(`错误的使用keepOnHarvestingSource：没有传入source位置参数`, "red"));
        return "moving";
    }
    if (Game.time % 5 === 0) {
        const pos = getMidPointPos(creep);
        creep.moveTo(pos);
    }

    const mineral = PosStr.getPosFromStr(actionArgs[0]).lookFor(LOOK_MINERALS)[0];
    creep.harvest(mineral);
    return "arrived";
}

export const keepOnHarvestingMineral: CreepAction = {
    run,
    name: "keepOnHarvestingMineral",
    description: "一直挖元素矿",
    type: "stay"
};
