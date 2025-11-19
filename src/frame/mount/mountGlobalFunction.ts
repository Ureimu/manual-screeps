/* eslint-disable no-useless-escape */
import { getMaintainRoomProject } from "AI/AIUreium/room/maintain/taskRelation";
import { clearCreepRouteMemory } from "frame/creep/action";
import { Base64 } from "js-base64";
import { newAcrossTickTask } from "utils/AcrossTick";
import bodypartsGenerator from "utils/bodypartsGenerator";
import { createFlattenHelp } from "utils/console/flattenHelp";
import { createForm } from "utils/console/form";
import { stats } from "frame/ui";
import { logManager } from "utils/log4screeps";
import { calcPowerToGPL } from "utils/gameLevel";

declare global {
    namespace NodeJS {
        interface Global {
            mf: {
                clearRoutes: () => void;
                createTestCreep: () => void;
                clearAll: (clearWalls: boolean) => void;
                ds: () => void;
                testConsole: () => string;
                testConsoleCommit: (args: { uploadedFile: string }) => string;
                resetAllMaintainTaskProject: () => void;
                stats: () => void;
                stopFor: (ticks: number) => void;
                id: string;
                hasClearAll: boolean;
                calcGPL: (gplLevel: number) => number;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalMicroFunction(): void {
    global.mf = {
        ds,
        clearRoutes,
        createTestCreep,
        clearAll,
        testConsole,
        testConsoleCommit,
        id: "",
        resetAllMaintainTaskProject,
        stats,
        hasClearAll: false,
        stopFor,
        calcGPL: calcPowerToGPL
    };
}
const logger = logManager.createLogger("debug", "GlobalFunction");
function ds(roomName?: string): void {
    if (roomName) {
        logger.info(`Destroying all structures in room ${roomName}`);
        Game.rooms[roomName].find(FIND_STRUCTURES).forEach(i => i.destroy());
    } else {
        logger.info(`Destroying all structures in all rooms`);
        Object.values(Game.rooms).forEach(room => room.find(FIND_STRUCTURES).forEach(i => i.destroy()));
    }
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
            intervalTick: 5,
            log: true
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

function clearAll(clearWalls: boolean): void {
    for (const creepName in Game.creeps) {
        Game.creeps[creepName].suicide();
    }
    RawMemory.set("{}");
    for (const spawn in Game.spawns) {
        Game.spawns[spawn].spawning?.cancel();
    }
    if (clearWalls) {
        Object.values(Game.rooms).forEach(room => {
            room.find(FIND_STRUCTURES)
                .filter((i): i is StructureWall => i.structureType === STRUCTURE_WALL)
                .forEach(i => i.destroy());
        });
    }
    for (const flagName in Game.flags) {
        Game.flags[flagName].remove();
    }
    global.mf.hasClearAll = true;
    // Game.cpu.halt(); 自己手动执行
}

// 似乎用该api上传的文件，无法获取到上传的内容。
function testConsole(): string {
    const commitFunctionName = "microFunction.testConsoleCommit";
    global.mf.id = "uploadedFile" + String(Date.now());
    return createForm(
        commitFunctionName + String(Game.time),
        [
            {
                name: "uploadedFile",
                label: "上传配置文件",
                type: "upload",
                id: global.mf.id
            }
        ],
        {
            content: "提交",
            command: `(args) => ${commitFunctionName}(args)`,
            type: "button",
            name: "button" + String(Game.time) + commitFunctionName
        }
    );
}

function testConsoleCommit(args: { uploadedFile: string }): string {
    const loadScript = `
<script>
var element = document.getElementById('${global.mf.id}');
global.test=element.form.id
</script>
    `
        .split("\n")
        .map(s => s.trim())
        .join("");
    return loadScript + args.uploadedFile;
}

function resetAllMaintainTaskProject(): void {
    for (const roomName in Game.rooms) {
        getMaintainRoomProject(roomName).reset();
    }
}

function stopFor(ticks: number) {
    Memory.stopTicks = ticks;
}
