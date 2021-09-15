let isBuilding = false;
let miningId: Id<Source> | undefined;
export function succor1(creep: Creep, args: string[]): void {
    const [spawnRoomName, claimRoomName] = args;
    if (creep.room.name !== claimRoomName) {
        creep.moveTo(new RoomPosition(25, 25, claimRoomName));
        return;
    }
    // 状态机
    if (creep.store.energy === 0 && isBuilding === true) {
        isBuilding = false;
    } else if (creep.store.getFreeCapacity() === 0 && isBuilding === false) {
        isBuilding = true;
    }
    if (isBuilding) {
        const spawnSite = creep.room.find(FIND_CONSTRUCTION_SITES).filter(i => i.structureType === "spawn")[0];
        if (spawnSite) {
            if (creep.pos.inRangeTo(spawnSite, 3)) {
                creep.build(spawnSite);
            }
            creep.moveTo(spawnSite);
        }
    } else {
        if (!miningId) {
            const sourceId = creep.room.find(FIND_SOURCES_ACTIVE)?.[0]?.id;
            if (sourceId) miningId = sourceId;
            else return;
        }
        const source = Game.getObjectById(miningId);
        if (source && source.energy !== 0) {
            if (creep.pos.inRangeTo(source, 1)) {
                creep.harvest(source);
            }
            creep.moveTo(source);
        } else {
            miningId = undefined;
        }
    }
}
