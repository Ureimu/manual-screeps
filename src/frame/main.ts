import { runAllAcrossTickTask } from "utils/AcrossTick";
import { registerFN } from "utils/profiler";
import { autoConstruction } from "./construct";
import { roomCpuCost } from "./cpuStats";
import runCreepAction from "./creep/action";
import { mountAll } from "./mount";
import { runSpawnPool, runSpawnQueue } from "./spawn/spawning";
import { shiftController } from "./spawn/spawning/readyCondition/shiftController";
import { statsEngine } from "./stats";
import { mapVisualForRoom } from "./visual/mapVisual";
import { roomVisualize } from "./visual/roomVisual";

export const runFrame = registerFN((): void => {
    if (global.mf?.hasClearAll && Game.cpu.halt) Game.cpu.halt();
    mountAll();
    runAllAcrossTickTask();
    if (Game.time % 1500 === 0) clearUnusedCreepMemory();
    Object.values(Game.rooms).forEach(room => {
        const start = Game.cpu.getUsed();
        const mySpawnsLength = room.find(FIND_MY_SPAWNS).length;
        if (room.memory.construct?.layout || room.controller?.my) {
            autoConstruction(room);
        }
        if (room.controller?.my && mySpawnsLength !== 0) {
            runSpawnPool(room);
            roomVisualize(room);
            mapVisualForRoom(room);
        }
        const end = Game.cpu.getUsed();
        roomCpuCost[room.name] = end - start;
    });

    Object.values(Game.spawns).forEach(spawn => {
        runSpawnQueue(spawn);
    });

    shiftController.run();

    Object.values(Game.creeps).forEach(creep => {
        runCreepAction(creep);
    });

    statsEngine.storeData();
}, "runFrame");

function clearUnusedCreepMemory(): void {
    const usingCreepSet = new Set<string>();
    Object.values(Game.rooms).forEach(room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            Object.keys(room.memory.spawnPool).forEach(creepName => usingCreepSet.add(creepName));
        }
    });
    Object.keys(Game.creeps).forEach(creepName => usingCreepSet.add(creepName));
    Object.keys(Memory.creeps).forEach(creepName => {
        if (!usingCreepSet.has(creepName)) {
            delete Memory.creeps[creepName];
        }
    });
}
