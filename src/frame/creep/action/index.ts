import { CreepGroupMode } from "frame/creep/group/type";
import { isRouteMidpointDetail } from "frame/creep/routePlan/type";
import { ErrorMapper } from "utils/ErrorMapper";
import { registerFN } from "utils/profiler";
import { creepAct } from "./doOnArrived";
import { doStuff } from "./onArrived";
import { judgeCondition } from "./onJudgeCondition";
import { moveCreep } from "./onMoving";
import { emptyRouteCacheDetail } from "./routeCache";
import { runCreepByRole } from "./runCreepByRole";

export function clearCreepRouteMemory(creepMemory: CreepMemory): void {
    creepMemory.route = {
        name: "",
        index: 0,
        state: "moving"
    };
}

export function callOnCreepBirth(creep: Creep): void {
    if (!global.creepMemory) global.creepMemory = {};
    if (!global.creepMemory[creep.name]) {
        global.creepMemory[creep.name] = {};
        global.creepMemory[creep.name].routeCacheDetail = emptyRouteCacheDetail;
    }
}

export function callOnStart(): void {
    global.routeCache = {};
    _.forEach(Game.creeps, creep => {
        callOnCreepBirth(creep);
    });
}

export interface CreepMemoryRouteDetail {
    name: string;
    index: number;
    state: state;
}

declare global {
    interface CreepMemory {
        route: CreepMemoryRouteDetail;
        mode?: CreepGroupMode;
        role: string;
    }
}

export type state = "moving" | "arrived" | "end" | "getState";
export type conditionState = "jump" | "notJump";

export default registerFN(runCreepAction, "runCreepAction");
function runCreepAction(creep: Creep): void {
    try {
        // if (Game.time % 10 === 0) throw new Error("test Error");
        if (creep.memory.mode === "role") {
            runCreepByRole(creep);
            return;
        }
        if (creep.memory.route && creep.memory.route.name !== "") {
            const creepRoute = creep.memory.route;
            const switchCounter = { count: 0 };
            runRecursiveCreepAction(creep, creepRoute, switchCounter);
            return;
        }
    } catch (e) {
        ErrorMapper.handleError(e);
    }
}

function runRecursiveCreepAction(
    creep: Creep,
    creepRoute: CreepMemoryRouteDetail,
    switchCounter: { count: number }
): void {
    if (creep.spawning) return;
    switchCounter.count++;
    const maxCount = 100;
    if (switchCounter.count > maxCount) {
        console.log(`${creep.name} 在 ${Game.time} 发生了 ${maxCount} 次状态转换，已经强制终止`);
        return;
    }
    const routeInfo = creep.memory.route;
    const route = Memory.routes[routeInfo.name];
    if (!route) throw Error(`creep ${creep.name} 从属的路径 ${routeInfo.name} 尚未定义，请先定义该路径`);
    if (!route.routeDetailArray) return;
    const routeDetail = route.routeDetailArray[routeInfo.index];
    if (!routeDetail) return;
    if (routeDetail && isRouteMidpointDetail(routeDetail)) {
        switch (creepRoute.state) {
            case "moving":
                creepRoute.state = moveCreep(creep, routeDetail);
                if (creepRoute.state === "arrived") {
                    runRecursiveCreepAction(creep, creepRoute, switchCounter);
                }
                break;
            case "arrived": {
                const type = creepAct[routeDetail.doWhenArrive].type;
                creepRoute.state = doStuff(creep, routeDetail);
                const nextMidpoint = Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index];
                if (creepRoute.state === "moving") {
                    // if (type === "stay" && isRouteMidpointDetail(nextMidpoint)) {
                    //     global.creepMemory[creep.name] = createRouteCache(routeDetail, nextMidpoint, creep.pos);
                    // } else {
                    //     global.creepMemory[creep.name] = emptyRouteCacheDetail;
                    // }
                    runRecursiveCreepAction(creep, creepRoute, switchCounter);
                }
                break;
            }
            case "end":
                clearCreepRouteMemory(creep.memory);
                break;
            default:
                break;
        }
    } else {
        switch (creepRoute.state) {
            case "moving":
            case "arrived":
            case "getState":
                creepRoute.state = judgeCondition(creep, routeDetail);
                if (creepRoute.state === "moving") {
                    runRecursiveCreepAction(creep, creepRoute, switchCounter);
                }
                break;
            default:
                break;
        }
    }
}
