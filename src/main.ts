import { enable, registerFN, wrap } from "utils/profiler";
import { ErrorMapper } from "utils/ErrorMapper";
import { autoConstruction } from "frame/construct";
import { roomCpuCost } from "frame/cpuStats";
import { clearUnusedCreepMemory } from "frame/main";
import { mountAll } from "frame/mount";
import { runRoomSpawnQueue, runSpawnPool } from "frame/spawn/spawning";
import { shiftController } from "frame/spawn/spawning/readyCondition/shiftController";
import { statsEngine } from "frame/stats";
import { runAllAcrossTickTask } from "utils/AcrossTick";
import { mountUreimuAiAll } from "AI/AIUreium/mount";
import { manageScoutTask } from "AI/AIUreium/roles/maintain/scouter";
import { runGetPower } from "AI/AIUreium/room/getPower";
import { maintainRoom } from "AI/AIUreium/room/maintain";
import { maintainNewRoom } from "AI/AIUreium/room/newRoom";
import { maintainOutwardsSource } from "AI/AIUreium/room/outwardsSource";
import { observer } from "AI/AIUreium/structure/observer";
import { powerSpawn } from "AI/AIUreium/structure/powerSpawn";
import { terminal } from "AI/AIUreium/structure/terminal";
import { tower } from "AI/AIUreium/structure/tower";
import { CreepBody } from "frame/creep/body";
import { link } from "AI/AIUreium/structure/link";
import { runProjectCreeps } from "frame/creep";
import { getMainControlData, loadSettings } from "AI/AIUreium/settings";
import { logManager } from "utils/log4screeps";
import { runLabTaskPool } from "AI/AIUreium/control/runLab";
import { multimeterWatch } from "utils/multimeter";

const logger = logManager.createLogger("debug", "main.init");
loadSettings();
require("moveOptimize");
global.version = "0.1.1";
if (getMainControlData().useProfiler) {
    logger.info("已启用profiler，会有一点额外的性能消耗。需要关闭请在settings中设置。");
    enable();
} else {
    logger.info("已关闭profiler，无法使用相关功能。需要启用请在settings中设置。");
}

export const loop = ErrorMapper.wrapLoop(() => {
    wrap(function () {
        // runFrame();
        // runAi();
        run();
    });
});

function run() {
    if (Memory.stopTicks && Memory.stopTicks > 0) {
        Memory.stopTicks -= 1;
        return;
    }

    if (global.mf?.hasClearAll && Game.cpu.halt) Game.cpu.halt();
    mountAll();
    mountUreimuAiAll();
    runAllAcrossTickTask();
    if (Game.time % 1500 === 0) clearUnusedCreepMemory();

    shiftController.run();
    statsEngine.storeData();

    if (!Memory.creepBodyConfig?.all) {
        CreepBody.createConfig({ creepBodyConfigName: "all" });
        CreepBody.setConfig({ creepBodyConfigName: "all", creepBodyConfig: "m2w1c1", controllerLevel: "1" });
    }

    manageScoutTask();

    Object.values(Game.rooms).forEach(room => {
        runRoom(room);
    });

    multimeterWatch();
}

const runRoom = registerFN(
    (room: Room) => {
        const start = Game.cpu.getUsed();

        if (room.memory.construct?.layout || room.controller?.my) {
            autoConstruction(room);
        }

        if (!room.controller) return;
        const mySpawns = room.find(FIND_MY_SPAWNS);
        if (room.controller?.my && mySpawns.length !== 0) {
            // run main tasks
            runSpawnPool(room);
            runLabTaskPool(room);
            // roomVisualize(room);
            // mapVisualForRoom(room);

            // run structures
            tower.run(room);
            link.run(room);
            terminal.run(room);
            observer.run(room);
            powerSpawn.run(room);
            runRoomSpawnQueue(room);

            // run projects, creeps with projectName are run by these projects.
            maintainRoom(room);
            maintainOutwardsSource(room);
            maintainNewRoom(room);
            runGetPower(room);

            // run creeps that has no projectName
            runProjectCreeps(room, undefined);
        }

        const end = Game.cpu.getUsed();
        roomCpuCost[room.name] = end - start;
    },
    "runRoom",
    room => room.name
);
