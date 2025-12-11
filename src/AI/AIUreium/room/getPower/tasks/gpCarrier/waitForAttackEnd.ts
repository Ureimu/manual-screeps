import { getPowerTaskObject } from "../../type";
import { getGPAttackerGroupName } from "../createCreepGroup/createGPAttackerGroup";

export const waitForAttackEnd: getPowerTaskObject = {
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
            // powerBank已经消失
            this.memory.spawnCarrier = false;
            return "end";
        }
        if (powerBank && powerBank.hits < powerBank.hitsMax / 2) {
            // 半血以下，开始孵化
            this.memory.spawnCarrier = true;
            return "end";
        }
        const powerBankMemory = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId];
        if (!powerBankMemory) throw new Error("no powerBank Memory");
        if (powerBankMemory.decayTime < Game.time) {
            // 已经decay掉了
            this.memory.spawnCarrier = false;
            return "end";
        }
        return "running";
    },
    justFinished() {
        return "end";
    }
};
