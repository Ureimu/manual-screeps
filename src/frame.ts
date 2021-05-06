import { autoConstruction } from "construction";
import { runCreepAction } from "creep/action";
import { mountAll } from "mount";
import { runSpawnPool, runSpawnQueue } from "spawn/spawning";

export function runFrame(): void {
    mountAll();
    if (Game.time % 100 === 0) console.log(`Current game tick is ${Game.time}`);
    Object.values(Game.rooms).forEach(room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            autoConstruction(room);
            runSpawnPool(room);
        }
    });

    Object.values(Game.spawns).forEach(spawn => {
        runSpawnQueue(spawn);
    });

    Object.values(Game.creeps).forEach(creep => {
        runCreepAction(creep);
    });
}