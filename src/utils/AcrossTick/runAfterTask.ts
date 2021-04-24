import { AcrossTick } from ".";
import { runTask } from "./runTask";
import { AcrossTickMemory } from "./type";

export function newAcrossTickTask(task: AcrossTickMemory): void {
    const acrossTickTask = new AcrossTick();
    acrossTickTask.runAfterTicks(task);
    acrossTickTask.finish();
}
export function runAllAcrossTickTask(): void {
    if (!Memory.AcrossTick) Memory.AcrossTick = {}; // 可以自己放在扩展挂载的地方
    runSpecifiedTickTask(Game.time);
}

function runSpecifiedTickTask(tick: number): void {
    if (Memory.AcrossTick[tick]) {
        const taskList = Memory.AcrossTick[tick].slice(0); // 复制一份拷贝,避免后面执行时更改memory引发错误
        for (const task of taskList) {
            // console.log(`Running TickTask: ${task.taskName}`);
            const returnCode = runTask(task);
            runAfterTask(returnCode, task);
        }
        delete Memory.AcrossTick[tick];
    }
}

export function runAfterTask(returnCode: string, task: AcrossTickMemory): string {
    switch (returnCode) {
        case "finish": {
            console.log(`Running TickTask finished: ${task.taskName}`);
            // Memory.AcrossTick[task.executeTick].splice(Memory.AcrossTick[task.executeTick].indexOf(task), 1);
            return "finish";
        }
        case "emptyTask": {
            console.log(`Running emptyTask finished: ${task.taskName}`);
            return "emptyTask";
        }
        case "runAgain": {
            newAcrossTickTask(task);
            // console.log(`Running TickTask finished: ${task.taskName}, this task will run again at ${task.executeTick}`);
            return "runAgain";
        }
        default:
            return "finish";
    }
}
