import { doStuff } from "./onArrived";
import { moveCreep } from "./onMoving";

export function clearCreepRouteMemory(creepMemory: CreepMemory): void {
    creepMemory.route = {
        name: "",
        index: 0,
        state: "moving"
    };
}

declare global {
    interface CreepMemory {
        route: {
            name: string;
            index: number;
            state: state;
        };
    }
}

export type state = "moving" | "arrived" | "end";

export function runCreepAction(creep: Creep): void {
    if (creep.memory.route && creep.memory.route.name !== "") {
        const creepRoute = creep.memory.route;
        switch (creepRoute.state) {
            case "moving":
                creepRoute.state = moveCreep(creep);
                if (creepRoute.state === "arrived") {
                    runCreepAction(creep);
                }
                break;
            case "arrived":
                creepRoute.state = doStuff(creep);
                break;
            case "end":
                clearCreepRouteMemory(creep.memory);
                break;
            default:
                break;
        }
    }
}
