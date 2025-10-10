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
