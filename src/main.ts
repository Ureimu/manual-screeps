import mountGlobalHelp from "mount/mountHelp";
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
            global.reset = true;
            profiler.enable(); // 挂载完所有原型后再启用profiler
        }

        if (Game.time % 100 === 0) console.log(`Current game tick is ${Game.time}`);

        const firstRoom = Game.rooms.W8N7;
        const spawns = firstRoom.find(FIND_MY_SPAWNS);
        const creeps = firstRoom.find(FIND_CREEPS);
        const source = Game.getObjectById<Source>("1db807721502822") as Source;
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

        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    });
});
