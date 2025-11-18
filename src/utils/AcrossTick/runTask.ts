import { logManager } from "utils/log4screeps";
import { AcrossTickMemory, AcrossTickReturnCode } from "./type";

const logger = logManager.createLogger("info", "AcrossTick.runTask");

export function runTask(task: AcrossTickMemory): AcrossTickReturnCode {
    for (const taskName in global.AcrossTickTaskFunction) {
        if (taskName === task.taskName) {
            return global.AcrossTickTaskFunction[taskName](task);
        }
    }
    logger.log(`task ${task.taskName} 不存在！`);
    return "finish";
}
