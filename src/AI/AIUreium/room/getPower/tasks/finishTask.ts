import { TaskObject } from "utils/Project";
import { stopGetPower } from "../stop";
import { getPowerTaskArgs } from "../taskRelation";
import { getGPCarrierGroupName } from "./createCreepGroup/createGPCarrierGroup";

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
            // console.log(
            //     `[finishTask.start] all carriers spawned and dead for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}`
            // );
            return "end";
        }
        const decayTime = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId]?.decayTime;
        if (decayTime && Game.time > decayTime + 1500) {
            // console.log(
            //     `[finishTask.start] decayTime passed for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}, decayTime:${decayTime}, now:${Game.time}`
            // );
            return "end";
        }
        if (!decayTime) {
            // console.log(
            //     `[finishTask.start] no decayTime for room:${roomName}, powerBankRoom:${powerBankRoomName}, id:${powerBankId}`
            // );
            return "end";
        }
        return "running";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        stopGetPower(roomName, powerBankRoomName, powerBankId);
        return "end";
    },
    justFinished() {
        return "end";
    }
};
// TODO 添加多种任务的启用关闭设置
