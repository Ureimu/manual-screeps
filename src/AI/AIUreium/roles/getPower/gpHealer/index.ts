export function gpHealer(creep: Creep, args: string[]) {
    const [originRoomName, powerBankRoomName, powerBankId] = args;
    const getPowerData = Memory.rooms[powerBankRoomName]?.powerBanks?.[powerBankId];
    if (!getPowerData) return;
    const powerBankPos = new RoomPosition(getPowerData.x, getPowerData.y, getPowerData.roomName);
    if (!creep.pos.inRangeTo(powerBankPos, 2)) {
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
    const nameSplit = creep.name.split("-");
    nameSplit[1] = "gpa";
    const gpAttackerName = nameSplit.join("-");
    // console.log(gpAttackerName);
    const gpAttacker = Game.creeps[gpAttackerName];
    if (!gpAttacker) return;
    if (!creep.pos.inRangeTo(gpAttacker, 1)) {
        creep.moveTo(gpAttacker, { range: 1 });
        return;
    }
    creep.heal(gpAttacker);
}
