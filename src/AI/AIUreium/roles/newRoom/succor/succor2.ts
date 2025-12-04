import { travelToNewRoom } from "../findPath";

const creepIsBuilding: { [name: string]: boolean } = {};
let miningId: Id<Source> | undefined;
export function succor2(creep: Creep, args: string[]): void {
    const [spawnRoomName, claimRoomName] = args;
    if (!travelToNewRoom(creep, claimRoomName)) {
        return;
    }
    if (!(creep.name in creepIsBuilding)) {
        creepIsBuilding[creep.name] = false;
    }
    // 状态机
    if (creep.store.energy === 0 && creepIsBuilding[creep.name] === true) {
        creepIsBuilding[creep.name] = false;
    } else if (creep.store.getFreeCapacity() === 0 && creepIsBuilding[creep.name] === false) {
        creepIsBuilding[creep.name] = true;
    }
    if (creepIsBuilding[creep.name]) {
        const spawnSite = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
        if (spawnSite) {
            if (creep.pos.inRangeTo(spawnSite, 3)) {
                creep.build(spawnSite);
            } else {
                creep.moveTo(spawnSite);
            }
        } else {
            creep.moveTo(new RoomPosition(25, 25, claimRoomName));
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
