import { getBoost } from "../../../control/boostCreep/getBoost";

export function gpAttacker(creep: Creep, args: string[]) {
    const [originRoomName, powerBankRoomName, powerBankId] = args;
    if (!getBoost(creep)) return;
    const getPowerData = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId];
    if (!getPowerData) return;
    const powerBankPos = new RoomPosition(getPowerData.x, getPowerData.y, getPowerData.roomName);
    if (!creep.pos.isNearTo(powerBankPos)) {
        creep.moveTo(powerBankPos);
        return;
    }
    if (!creep.memory.dontPullMe) {
        creep.memory.dontPullMe = true;
    }
    const powerBank = Game.getObjectById(powerBankId as Id<StructurePowerBank>);
    if (creep.room.name === getPowerData.roomName && !powerBank) {
        creep.suicide();
    }
    if (creep.hits !== creep.hitsMax) return;

    if (!powerBank) return;
    creep.attack(powerBank);
}
