import { clearCreepRouteMemory } from "creep/action";
import { newAcrossTickTask } from "utils/AcrossTick";
import bodypartsGenerator from "utils/bodypartsGenerator";
import { createFlattenHelp } from "utils/console/flattenHelp";
import { createForm } from "utils/console/form";

declare global {
    namespace NodeJS {
        interface Global {
            microFunction: {
                clearRoutes: () => void;
                createTestCreep: () => void;
                clearAll: () => void;
                testConsole: () => string;
                testConsoleCommit: (args: { uploadedFile: string }) => string;
                id: string;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalMicroFunction(): void {
    global.microFunction = { clearRoutes, createTestCreep, clearAll, testConsole, testConsoleCommit, id: "" };
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

function clearAll(): void {
    for (const creepName in Game.creeps) {
        Game.creeps[creepName].suicide();
    }
    RawMemory.set("{}");
    // Game.cpu.halt(); 自己手动执行
}

function testConsole(): string {
    const commitFunctionName = "microFunction.testConsoleCommit";
    global.microFunction.id = "uploadedFile" + String(Date.now());
    return createForm(
        commitFunctionName + String(Game.time),
        [
            {
                name: "uploadedFile",
                label: "上传配置文件",
                type: "upload",
                id: global.microFunction.id
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
var element = document.getElementById('${global.microFunction.id}');
global.test=element.form.id
</script>
    `
        .split("\n")
        .map(s => s.trim())
        .join("");
    return loadScript + args.uploadedFile;
}
