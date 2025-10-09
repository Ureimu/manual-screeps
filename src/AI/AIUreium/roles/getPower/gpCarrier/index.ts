export function gpCarrier(creep: Creep, args: string[]) {
    const [originRoomName, powerBankRoomName, powerBankId] = args;
    if (creep.store.getUsedCapacity() === 0) {
        const getPowerData = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId];
        if (!getPowerData) return;
        const powerBankPos = new RoomPosition(getPowerData.x, getPowerData.y, getPowerData.roomName);
        if (!creep.pos.inRangeTo(powerBankPos, 6)) {
            creep.moveTo(powerBankPos);
            return;
        }
        if (!creep.memory.dontPullMe) {
            creep.memory.dontPullMe = true;
        }
        const powerBank = Game.getObjectById(powerBankId as Id<StructurePowerBank>);
        if (creep.room.name === getPowerData.roomName && !powerBank) {
            if (!creep.pos.inRangeTo(powerBankPos, 1)) {
                creep.moveTo(powerBankPos, { range: 1 });
                return;
            }
            const resources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: i => i.resourceType === RESOURCE_POWER && powerBankPos.isEqualTo(i)
            });
            if (!resources?.[0]) return;
            creep.pickup(resources[0]);
        }
    } else {
        const storage = Game.rooms[originRoomName].storage;
        if (!storage) return;
        creep.moveTo(storage, { range: 1 });
        if (creep.pos.isNearTo(storage)) {
            creep.transfer(storage, RESOURCE_POWER);
            creep.suicide();
        }
    }
}
