import { logManager } from "utils/log4screeps";
import { registerFN } from "utils/profiler";
import { PosStr } from "utils/RoomPositionToStr";
import { runLayout } from "./runLayOut";
import { getStructureMemory } from "./utils";
import { getTotalSiteNum } from "./utils/getTotalSiteNum";

const logger = logManager.createLogger("info", "build");

export function callOnStart(room: Room): void {
    const controller = room.controller;
    if (controller?.my) {
        if (room.memory.construct === undefined) {
            // 初始化memory
            (room.memory as Partial<RoomMemory>) = {
                construct: {
                    startTime: Game.time,
                    roomControlStatus: [1],
                    construction: {},
                    centerPos: "",
                    ifCompleted: false
                }
            }; // s
        }

        if (!room.memory.construct.firstSpawnName) {
            const spawnMemory = getStructureMemory(room.name, "spawn", "spawn")?.structureList[0];
            if (spawnMemory) {
                room.memory.construct.firstSpawnName = {
                    name: (Game.structures[spawnMemory.id] as StructureSpawn).name,
                    pos: spawnMemory.pos
                };
            }
        }
    }
}

/**
 * 重新检测所有建筑
 *
 * @param {Room} room
 */
function restartConstruction(room: Room): void {
    for (const m in room.memory.construct.construction) {
        const constructMemory =
            room.memory.construct.construction[m as keyof typeof room.memory.construct.construction];
        if (constructMemory) constructMemory.hasPutSites = false;
    }
}

/**
 * 自动建筑
 *
 * @param {Room} room
 */
export const autoConstruction = registerFN((room: Room): void => {
    callOnStart(room);
    if (room.controller?.my) {
        room.memory.construct.roomControlStatus = [
            room.controller?.level,
            room.controller?.progress,
            room.controller?.progressTotal,
            getTotalSiteNum()
        ];
    } else {
        room.memory.construct.roomControlStatus = [0, 0, 0, getTotalSiteNum()];
    }

    if (room.controller?.my && room.memory.construct.roomControlStatus[0] !== room.controller?.level) {
        restartConstruction(room);
        logger.log("房间等级提升，重新检查建筑数量");
    }
    if ((Game.time - room.memory.construct.startTime) % 5000 === 0) {
        restartConstruction(room);
        logger.log("定时检查建筑数量");
    }

    let refreshTime = 75;
    const startTime = room.memory.construct.startTime;
    if (Game.time - startTime <= 60) {
        if (Game.cpu.bucket > 1e3) {
            refreshTime = 50;
        } else {
            refreshTime = 300;
        }

        if ((room.controller?.level ?? 0) >= 8) {
            refreshTime = 1000;
        }
    }
    // logger.log(`autoConstruction ${room.name} ${(Game.time - startTime) % refreshTime}`);
    if (
        (Game.time - startTime) % refreshTime === refreshTime - 1 ||
        (Game.time - startTime) % refreshTime === refreshTime - 2
    ) {
        // logger.log(`runLayout ${room.name}`);
        runLayout(room);
    }
}, "autoConstruction");
