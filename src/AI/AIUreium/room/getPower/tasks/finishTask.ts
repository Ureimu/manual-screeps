import { logManager } from "utils/log4screeps";
import { TaskObject } from "utils/Project";
import { stopGetPower } from "../stop";
import { getPowerTaskArgs } from "../type";
import { getGPCarrierGroupName } from "./createCreepGroup/createGPCarrierGroup";
const logger = logManager.createLogger("debug", "getPower.finishTask");
export const finishTask: TaskObject<getPowerTaskArgs> = {
    name: "finishTask",
    description: "finishTask",
    start(roomName, powerBankRoomName, powerBankId) {
        const carrierNameList =
            Memory.creepGroups[getGPCarrierGroupName(roomName, powerBankRoomName, powerBankId)].creepNameList;
        if (
            carrierNameList.every(
                creepName => Memory.rooms[roomName].spawnPool[creepName].spawnCount > 0 && !Game.creeps[creepName]
            )
        ) {
            logger.debug(
                `all carriers spawned and dead for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}`
            );
            return "end";
        }
        const decayTime = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId]?.decayTime;
        if (decayTime && Game.time > decayTime + 1500) {
            logger.debug(
                `decayTime passed for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}, decayTime:${decayTime}, now:${Game.time}`
            );
            return "end";
        }
        if (!decayTime) {
            logger.debug(`no decayTime for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}`);
            return "end";
        }
        return "running";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        logger.debug(
            `stop getPower, remove task. room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}`
        );
        stopGetPower(roomName, powerBankRoomName, powerBankId);
        return "end";
    },
    justFinished() {
        return "stopProject";
    }
};
// TODO 添加多种任务的启用关闭设置
