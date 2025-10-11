import { CreepBody } from "frame/creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "frame/creep/body/type";
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
// TODO 在recordRoomData添加获取powerBank周围空位数量，并按照空位来规划creep孵化数量和是否选择该powerBank
// BUG 在刚摧毁powerBank时就过早结束任务，未搬运power
