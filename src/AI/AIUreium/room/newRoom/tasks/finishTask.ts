import { logManager } from "utils/log4screeps";
import { TaskObject } from "utils/Project";
import { stopNewRoom } from "../stop";
import { MemoryAddressArgs, newRoomTaskArgs } from "../type";
const logger = logManager.createLogger("debug", "newRoom.finishTask");
export const finishTask: TaskObject<newRoomTaskArgs, MemoryAddressArgs> = {
    name: "finishTask",
    description: "finishTask",
    start(spawnRoomName, claimRoomName) {
        return "end";
    },
    working(spawnRoomName, claimRoomName) {
        logger.debug(`stop newRoom, remove task. room:${spawnRoomName}, claimRoomName:${claimRoomName}`);
        stopNewRoom(spawnRoomName, claimRoomName);
        return "end";
    },
    justFinished() {
        return "stopProject";
    }
};
// TODO 添加多种任务的启用关闭设置
