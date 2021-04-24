import { clearCreepRouteMemory } from "creep/action";
import { newAcrossTickTask } from "utils/AcrossTick";
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
    newAcrossTickTask(
        {
            taskName: "spawnTestCreep",
            args: [0],
            executeTick: Game.time + 1,
            intervalTick: 5
        },
        task => {
            const [index] = task.args as string[];
            const numberIndex = Number(index);
            Game.spawns.Spawn1.spawnCreep(bodypartsGenerator.bpg([{ move: 1 }]), `test${index}`);
            if (numberIndex < 4) {
                task.args = [numberIndex + 1];
                return "runAgain";
            } else {
                return "finish";
            }
        }
    );
}
