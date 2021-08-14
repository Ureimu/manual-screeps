import { registerFN } from "utils/profiler";
import { profile } from "utils/profiler/decorator";
import { runTask } from "./runTask";
import { AcrossTickMemory, AcrossTickReturnCode } from "./type";

@profile
export class AcrossTick {
    public task: AcrossTickMemory;
    public constructor() {
        if (!Memory.AcrossTick) Memory.AcrossTick = {}; // 可以自己放在扩展挂载的地方
        this.task = {
            taskName: "",
            args: [],
            executeTick: Game.time,
            taskCreateTick: Game.time,
            intervalTick: 1,
            log: false
        };
    }

    public runAfterTicks(task: AcrossTickMemory): void {
        if (task.executeTick < 0) throw new Error("task.executeTick不应小于0");
        task.executeTick += task.intervalTick;
        this.task = Object.assign(this.task, task);
    }

    public runNow(): void {
        this.task.executeTick = Game.time;
    }

    public static mountTaskFunction(
        task: { taskName: string },
        taskFunction: (task: AcrossTickMemory) => AcrossTickReturnCode
    ): void {
        if (!global.AcrossTickTaskFunction) {
            global.AcrossTickTaskFunction = {};
        }
        global.AcrossTickTaskFunction[task.taskName] = taskFunction;
    }

    public finish(): void {
        if (!Memory.AcrossTick[this.task.executeTick]) Memory.AcrossTick[this.task.executeTick] = [];
        Memory.AcrossTick[this.task.executeTick].push(this.task);
    }
}

export function newAcrossTickTask(
    task: AcrossTickMemory,
    taskFunction?: (task: AcrossTickMemory) => AcrossTickReturnCode
): void {
    const acrossTickTask = new AcrossTick();
    if (taskFunction) {
        AcrossTick.mountTaskFunction(task, taskFunction);
    }
    acrossTickTask.runAfterTicks(task);
    acrossTickTask.finish();
}

export const runAllAcrossTickTask = registerFN((): void => {
    if (!Memory.AcrossTick) Memory.AcrossTick = {}; // 可以自己放在扩展挂载的地方
    if (!global.AcrossTickTaskFunction) {
        global.AcrossTickTaskFunction = {};
    }
    if (!global.AcrossTickTaskFunction[""]) {
        global.AcrossTickTaskFunction[""] = (task: AcrossTickMemory): AcrossTickReturnCode => {
            console.log(`An empty task was detected`);
            return "emptyTask";
        };
    }
    if (!global.AcrossTickTaskFunction.test) {
        global.AcrossTickTaskFunction.test = (task: AcrossTickMemory): AcrossTickReturnCode => {
            console.log(
                `${Game.time} Running TickTask: ${task.taskName},args:${JSON.stringify(task.args)} created in ${
                    task.taskCreateTick as number
                } succeed`
            );
            return "finish";
        };
    }
    runSpecifiedTickTask(Game.time);
}, "runAllAcrossTickTask");

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

export function runAfterTask(returnCode: AcrossTickReturnCode, task: AcrossTickMemory): AcrossTickReturnCode {
    switch (returnCode) {
        case "finish": {
            if (task.log) console.log(`Running TickTask finished: ${task.taskName}`);
            // Memory.AcrossTick[task.executeTick].splice(Memory.AcrossTick[task.executeTick].indexOf(task), 1);
            return "finish";
        }
        case "emptyTask": {
            if (task.log) console.log(`Running emptyTask finished: ${task.taskName}`);
            return "emptyTask";
        }
        case "runAgain": {
            newAcrossTickTask(task);
            // if (task.log) console.log(`Running TickTask finished: ${task.taskName}, this task will run again at ${task.executeTick}`);
            return "runAgain";
        }
        default:
            return "finish";
    }
}
