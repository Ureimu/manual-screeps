/* eslint-disable no-useless-escape */
import { getMaintainRoomProject } from "AIUreium/room/maintain/taskRelation";
import { clearCreepRouteMemory } from "creep/action";
import { Base64 } from "js-base64";
import { newAcrossTickTask } from "utils/AcrossTick";
import bodypartsGenerator from "utils/bodypartsGenerator";
import { createFlattenHelp } from "utils/console/flattenHelp";
import { createForm } from "utils/console/form";
import { stats } from "utils/ui";

declare global {
    namespace NodeJS {
        interface Global {
            mf: {
                clearRoutes: () => void;
                createTestCreep: () => void;
                clearAll: () => void;
                testConsole: () => string;
                testConsoleCommit: (args: { uploadedFile: string }) => string;
                resetAllMaintainTaskProject: () => void;
                stats: () => void;
                id: string;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalMicroFunction(): void {
    global.mf = {
        clearRoutes,
        createTestCreep,
        clearAll,
        testConsole,
        testConsoleCommit,
        id: "",
        resetAllMaintainTaskProject,
        stats
    };
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

function clearAll(): void {
    for (const creepName in Game.creeps) {
        Game.creeps[creepName].suicide();
    }
    RawMemory.set("{}");
    for (const spawn in Game.spawns) {
        Game.spawns[spawn].spawning?.cancel();
    }
    // Game.cpu.halt(); 自己手动执行
}

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
