import { runAllAcrossTickTask } from "utils/AcrossTick";
import { registerFN } from "utils/profiler";
import { autoConstruction } from "./construct";
import runCreepAction from "./creep/action";
import { mountAll } from "./mount";
import { runSpawnPool, runSpawnQueue } from "./spawn/spawning";
import { mapVisualForRoom } from "./visual/mapVisual";
import { roomVisualize } from "./visual/roomVisual";

export const runFrame = registerFN((): void => {
    runAllAcrossTickTask();
    mountAll();
    if (Game.time % 1500 === 0) clearUnusedCreepMemory();
    Object.values(Game.rooms).forEach(room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            autoConstruction(room);
            runSpawnPool(room);
            roomVisualize(room);
            mapVisualForRoom(room);
        }
    });

    Object.values(Game.spawns).forEach(spawn => {
        runSpawnQueue(spawn);
    });

    Object.values(Game.creeps).forEach(creep => {
        runCreepAction(creep);
    });
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
