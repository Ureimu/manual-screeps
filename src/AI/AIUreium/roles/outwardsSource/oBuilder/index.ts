import { logManager } from "utils/log4screeps";
import { PosStr } from "utils/RoomPositionToStr";
const logger = logManager.createLogger("debug", "oBuilder");

const creepMemory: {
    [name: string]: {
        pathIndex: number;
        isWithdrawing: boolean;
    };
} = {};

export function oBuilder(creep: Creep, args: string[]): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    const sourceData = Memory.rooms[sourceRoomName].sources?.[sourceName].roomData[originRoomName];
    const path = sourceData?.path;
    if (!path) {
        logger.info("no path, stop");
        return;
    }

    if (!creepMemory[creep.name]) {
        creepMemory[creep.name] = {
            pathIndex: 0,
            isWithdrawing: false
        };
    }

    // 维护pathIndex
    const pathIndex = creepMemory[creep.name].pathIndex;
    const pathEndIndex = path.length - 1;

    if (pathIndex > pathEndIndex) {
        creepMemory[creep.name].pathIndex = 0;
    }

    if (pathIndex === pathEndIndex) {
        // 结束任务
        creepMemory[creep.name].pathIndex = 0;
        sourceData.maintainRoad = false;
        creep.suicide();
        return;
    }

    // 状态机
    if (!creepMemory[creep.name].isWithdrawing && creep.store.energy === 0) {
        creepMemory[creep.name].isWithdrawing = true;
    }
    if (creepMemory[creep.name].isWithdrawing && creep.store.getFreeCapacity() === 0) {
        creepMemory[creep.name].isWithdrawing = false;
    }

    // 获取能量
    if (creepMemory[creep.name].isWithdrawing) {
        const originRoom = Game.rooms[originRoomName];
        if (!originRoom.storage) {
            logger.debug(`${creep.name} no storage in origin room ${originRoomName}`);
            return;
        }
        const storage = originRoom.storage;
        if (!creep.pos.inRangeTo(storage, 1)) {
            creep.moveTo(storage, { range: 1 });
        } else {
            creep.withdraw(storage, "energy");
        }
    } else {
        // 修路
        const roadPos = PosStr.getPosFromStr(path[pathIndex]);
        if (roadPos.x === 0 || roadPos.x === 49 || roadPos.y === 0 || roadPos.y === 49) {
            creepMemory[creep.name].pathIndex += 1;
            return;
        }
        if (!creep.pos.inRangeTo(roadPos, 3) || creep.pos.roomName !== roadPos.roomName) {
            creep.moveTo(roadPos, { range: 1 });
        } else {
            const road = creep.room.lookForAt(LOOK_STRUCTURES, roadPos).find(i => i.structureType === "road");
            if (!road) {
                const roadSite = creep.room
                    .lookForAt(LOOK_CONSTRUCTION_SITES, roadPos)
                    .find(i => i.structureType === "road");
                if (!roadSite) {
                    creep.room.createConstructionSite(roadPos, "road");
                    return;
                }
                creep.build(roadSite);
                return;
            }
            if (road.hits !== road.hitsMax) {
                creep.repair(road);
                return;
            } else {
                creepMemory[creep.name].pathIndex += 1;
                return;
            }
        }
    }
}
