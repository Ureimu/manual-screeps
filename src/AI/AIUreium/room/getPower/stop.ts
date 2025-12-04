import { stopProjectCreeps } from "frame/utils";
import { logManager } from "utils/log4screeps";
import { getPowerProjectName, getPowerTaskArgs } from "./type";

const logger = logManager.createLogger("debug", "stopGetPower");
export function stopGetPower(...args: getPowerTaskArgs): void {
    const [originRoomName, powerBankRoomName, powerBankId] = args;

    const room = Game.rooms[originRoomName];
    if (!room.memory.status) {
        room.memory.status = {};
    }
    const status = room.memory.status;
    status.getPower = false;

    const projectName = getPowerProjectName;
    stopProjectCreeps(originRoomName, projectName);

    // 停止project运行在project处理，具体为直接返回"stopProject"
}
