import { autoConstruction } from "construction";
import { runCreepAction } from "creep/action";
import mountCallOnStart from "mount/mountCallOnStart";
import mountCommit from "mount/mountCommit";
import mountGlobalMicroFunction from "mount/mountGlobalFunction";
import mountGlobalFunctionClass from "mount/mountGlobalFunctionClass";
import mountGlobalFunctionObject from "mount/mountGlobalFunctionObject";
import mountGlobalHelp from "mount/mountHelp";
import { runAllAcrossTickTask } from "utils/AcrossTick";
import bodypartsGenerator from "utils/bodypartsGenerator";
import { ErrorMapper } from "utils/ErrorMapper";
import condition, { customFunction } from "utils/stateCut/condition";
import { stateCut } from "utils/stateCut/utils";
import * as profiler from "./utils/profiler";

// 有ErrorMapper作为报错检测工具，profiler作为性能检测工具。
export const loop = ErrorMapper.wrapLoop(() => {
    profiler.wrap(function () {
        if (!global.reset) {
            mountGlobalHelp();
            mountGlobalFunctionClass();
            mountGlobalFunctionObject();
            mountGlobalMicroFunction();
            mountCallOnStart();
            mountCommit();
            global.reset = true;
            profiler.enable(); // 挂载完所有原型后再启用profiler
            console.log("[mount] 挂载扩展");
        }

        if (Game.time % 100 === 0) console.log(`Current game tick is ${Game.time}`);
        const firstSpawn = Game.spawns.Spawn1;
        const firstRoom = firstSpawn.room;
        autoConstruction(firstRoom);
        const spawns = firstRoom.find(FIND_MY_SPAWNS);
        const creeps = firstRoom.find(FIND_CREEPS);
        const sources = firstRoom.find(FIND_SOURCES);
        const source = Game.getObjectById<Source>("5bbcac509099fc012e63547a") as Source;
        if (creeps.length === 0) {
            spawns[0].spawnCreep(bodypartsGenerator.bpg([{ move: 2, work: 1, carry: 1 }]), "helloWorld");
        } else {
            const creep = creeps[0];
            const state = creep.memory.state ? creep.memory.state : (creep.memory.state = []);
            const ifHarvesting = stateCut(
                state,
                [customFunction(condition.isEmpty(creep)), customFunction(condition.isNotFull(creep))],
                0,
                (stateNum: number) => {
                    creep.say(["🚧 working", "🔄 harvest"][stateNum]);
                }
            );
            if (ifHarvesting) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) creeps[0].moveTo(source, { range: 1 });
            } else {
                const controller = firstRoom.controller as StructureController;
                if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE)
                    creeps[0].moveTo(controller, { range: 3 });
            }
        }

        Object.values(Game.creeps).forEach(creep => {
            runCreepAction(creep);
        });

        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }

        runAllAcrossTickTask();
    });
});
