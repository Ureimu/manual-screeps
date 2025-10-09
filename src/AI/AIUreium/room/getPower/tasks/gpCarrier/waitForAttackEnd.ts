import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../../taskRelation";
import { getGPAttackerGroupName } from "../createCreepGroup/createGPAttackerGroup";

export const waitForAttackEnd: TaskObject<getPowerTaskArgs> = {
    name: "waitForAttackEnd",
    description: "waitForAttackEnd",
    start(roomName) {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        // 在gpAttacker工作完之前，提前进行carrier孵化
        const powerBankRoom = Game.rooms[powerBankRoomName];
        const powerBank = Game.getObjectById(powerBankId as Id<StructurePowerBank>);
        if (powerBankRoom && !powerBank) {
            return "end";
        }
        const attackerNameList =
            Memory.creepGroups[getGPAttackerGroupName(roomName, powerBankRoomName, powerBankId)].creepNameList;

        // 未启用
        // return "running"
        return "end";
    },
    justFinished() {
        return "end";
    }
};
