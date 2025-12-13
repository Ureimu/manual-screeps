import { projectNameList } from "AI/AIUreium/projects";
import { stopProjectCreeps } from "frame/utils";
import { logManager } from "utils/log4screeps";

const logger = logManager.createLogger("debug", "abandonRoom");
export function abandonRoom(roomName: string): void {
    // 停止该房间projects creeps
    projectNameList.forEach(projectName => {
        stopProjectCreeps(roomName, projectName);
    });

    // 停止该房间不属于project的creeps
    stopProjectCreeps(roomName, undefined);

    const room = Game.rooms[roomName];
    if (!room.controller) {
        logger.error("no controller");
        return;
    }

    // 摧毁所有建筑
    room.find(FIND_STRUCTURES)
        .filter(i => i.destroy)
        .forEach(i => i.destroy());

    // 移除所有工地
    room.find(FIND_MY_CONSTRUCTION_SITES).forEach(i => i.remove());

    // unclaim房间
    room.controller.unclaim();

    // 清空Memory
    delete Memory.rooms[roomName];
}
