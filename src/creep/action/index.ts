import { isRouteMidpointDetail } from "creep/routePlan";
import { PosStr } from "utils/RoomPositionToStr";
import { actionIndexedList } from "./doOnArrived";
import { doStuff } from "./onArrived";
import { judgeCondition } from "./onJudgeCondition";
import { moveCreep } from "./onMoving";
import { createRouteCache, emptyRouteCacheDetail } from "./routeCache";

export function clearCreepRouteMemory(creepMemory: CreepMemory): void {
    creepMemory.route = {
        name: "",
        index: 0,
        state: "moving"
    };
}

export function callOnCreepBirth(creep: Creep): void {
    if (!global.creepMemory) global.creepMemory = {};
    if (!global.creepMemory[creep.name]) global.creepMemory[creep.name] = emptyRouteCacheDetail;
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
    }
}

export type state = "moving" | "arrived" | "end" | "getState";

export function runCreepAction(creep: Creep): void {
    if (creep.memory.route && creep.memory.route.name !== "") {
        const creepRoute = creep.memory.route;
        const switchCounter = { count: 0 };
        runRecursiveCreepAction(creep, creepRoute, switchCounter);
    }
}

export function runRecursiveCreepAction(
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
    const routeDetail = route.routeDetailArray[routeInfo.index];
    if (isRouteMidpointDetail(routeDetail)) {
        switch (creepRoute.state) {
            case "moving":
                creepRoute.state = moveCreep(creep, routeDetail);
                if (creepRoute.state === "arrived") {
                    runRecursiveCreepAction(creep, creepRoute, switchCounter);
                }
                break;
            case "arrived":
                const type = actionIndexedList[routeDetail.doWhenArrive].type;
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
            case "end":
                clearCreepRouteMemory(creep.memory);
                break;
            default:
                break;
        }
    } else {
        switch (creepRoute.state) {
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
