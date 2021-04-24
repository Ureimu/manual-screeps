import { clearCreepRouteMemory } from "creep/action";
import bodypartsGenerator from "utils/bodypartsGenerator";

declare global {
    namespace NodeJS {
        interface Global {
            microFunction: { clearRoutes: () => void; createTestCreep: () => void };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalMicroFunction(): void {
    global.microFunction = { clearRoutes, createTestCreep };
}

function clearRoutes(): void {
    Memory.routes = {};
    Object.values(Game.creeps).forEach(creep => clearCreepRouteMemory(creep.memory));
}

function createTestCreep(): void {
    Game.spawns.Spawn1.spawnCreep(bodypartsGenerator.bpg([{ move: 1 }]), "test");
}
