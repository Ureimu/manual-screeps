import { state } from "creep/action";
import { initGlobalCreepMemory } from "./initGlobalCreepMemory";

export function runningCounter(creep: Creep): state {
    initGlobalCreepMemory(creep);
    if (!global.creepMemory[creep.name].count) global.creepMemory[creep.name].count = 0;
    if (global.creepMemory[creep.name].gameTime !== Game.time) {
        global.creepMemory[creep.name].gameTime = Game.time;
        global.creepMemory[creep.name].count = 0;
    }
    (global.creepMemory[creep.name].count as number)++;
    if ((global.creepMemory[creep.name].count as number) % 2 === 1) return "moving";
    return "arrived";
}
