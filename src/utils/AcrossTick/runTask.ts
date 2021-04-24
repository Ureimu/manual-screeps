import { AcrossTickMemory, AcrossTickReturnCode } from "./type";

export function runTask(task: AcrossTickMemory): AcrossTickReturnCode {
    for (const taskName in global.AcrossTickTaskFunction) {
        if (taskName === task.taskName) {
            return global.AcrossTickTaskFunction[taskName](task);
        }
    }
    console.log(`task ${task.taskName} 不存在！`);
    return "finish";
}
