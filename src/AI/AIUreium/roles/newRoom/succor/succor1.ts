import { travelToNewRoom } from "../findPath";

const creepIsBuilding: { [name: string]: boolean } = {};
let miningId: Id<Source> | undefined;
export function succor1(creep: Creep, args: string[]): void {
    const [spawnRoomName, claimRoomName] = args;
    if (!travelToNewRoom(creep, claimRoomName)) {
        return;
    }
    if (!(creep.name in creepIsBuilding)) {
        creepIsBuilding[creep.name] = false;
    }
    if (creep.store.energy === 0 && creepIsBuilding[creep.name] === true) {
        // 状态机
        creepIsBuilding[creep.name] = false;
    } else if (creep.store.getFreeCapacity() === 0 && creepIsBuilding[creep.name] === false) {
        creepIsBuilding[creep.name] = true;
    }
    if (creepIsBuilding[creep.name]) {
        const spawnSite = creep.room.find(FIND_CONSTRUCTION_SITES).filter(i => i.structureType === "spawn")[0];
        if (spawnSite) {
            if (creep.pos.inRangeTo(spawnSite, 3)) {
                creep.build(spawnSite);
            }
            if (!creep.pos.inRangeTo(spawnSite, 1)) {
                creep.moveTo(spawnSite);
            }
        } else {
            creep.moveTo(new RoomPosition(25, 25, claimRoomName));
        }
    } else {
        if (!miningId) {
            const sources = creep.room.find(FIND_SOURCES_ACTIVE);
            const sourceId = sources[_.random(0, sources.length)]?.id;
            if (sourceId) miningId = sourceId;
            else return;
        }
        const source = Game.getObjectById(miningId);
        if (source && source.energy !== 0) {
            if (creep.pos.inRangeTo(source, 1)) {
                creep.harvest(source);
            } else {
                creep.moveTo(source);
            }
        } else {
            miningId = undefined;
        }
    }
}
