import { RouteMidpointDetail } from "frame/creep/routePlan/type";
import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "HarvestSource");

function run(creep: Creep, actionArgs?: string[]): state {
    if (!actionArgs) {
        logger.error(`错误的使用keepOnHarvestingSource：没有传入source位置参数`);
        return "moving";
    }
    if (Game.time % 5 === 0) {
        const pos = PosStr.getPosFromStr(
            (Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index] as RouteMidpointDetail)
                .pathMidpointPos
        );
        creep.moveTo(pos);
    }
    if (Game.time % 20 === 0) {
        if (creep.store.energy > 0) {
            const container = creep.pos
                .lookFor(LOOK_STRUCTURES)
                .filter(i => i.structureType === STRUCTURE_CONTAINER && i.hits < 5e4)[0];
            if (container) {
                creep.repair(container);
                return "arrived";
            }
        }
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
