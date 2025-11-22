import { state } from "frame/creep/action";
import { initGlobalCreepMemory } from "./initGlobalCreepMemory";

export function runningCounter(creep: Creep, name: string): number {
    initGlobalCreepMemory(creep);
    const creepGlobalMemory = global.creepMemory[creep.name];
    if (!creepGlobalMemory.count) creepGlobalMemory.count = {};
    if (creepGlobalMemory.gameTime !== Game.time) {
        creepGlobalMemory.gameTime = Game.time;
        creepGlobalMemory.count[name] = 0;
    }
    if (creepGlobalMemory.count[name] === null) {
        creepGlobalMemory.count[name] = 0;
    }
    creepGlobalMemory.count[name]++;
    return creepGlobalMemory.count[name];
}
declare global {
    interface GlobalCreepMemory {
        count?: {
            [name: string]: number;
        };
        gameTime?: number;
    }
}
