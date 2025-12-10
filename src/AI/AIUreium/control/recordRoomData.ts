import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { checkControllerRoomName, checkHighwayRoomName } from "utils/roomNameUtils";
import { PosStr } from "utils/RoomPositionToStr";
import { getBlankSpace } from "utils/terrainJudgement";
import { logManager } from "utils/log4screeps";
import type MoveOptimize from "utils/moveOptimize";
const moveOptimize: typeof MoveOptimize = require("moveOptimize");

const logger = logManager.createLogger("info", "RecordRoomData");

export function recordRoomData(room: Room): void {
    logger.debug(`Starting recordRoomData for room: ${room.name}`);
    FlagMaintainer.refresh({
        roomName: room.name,
        typeList: FlagMaintainer.getTypeList(["source", "controller"])
    });

    // 记录所有者
    if (room.memory.owner !== room.controller?.owner?.username) {
        if (!room.controller?.owner?.username || room.controller?.my) {
            moveOptimize.deleteAvoidRooms(room.name);
        } else {
            moveOptimize.addAvoidRooms(room.name);
        }
    }
    room.memory.owner = room.controller?.owner?.username;

    // 外矿数据
    const sources = room.find(FIND_SOURCES);
    // console.log(sources.map(i => `${i.room.name},${i.pos.x},${i.pos.y}`));
    if (!room.memory.sources) room.memory.sources = {};
    const roomSourcesMemory = room.memory.sources;
    _.forEach(Game.rooms, originRoom => {
        logger.debug(`Processing originRoom: ${originRoom.name}`);
        const linearDistance = Game.map.getRoomLinearDistance(originRoom.name, room.name);
        if (linearDistance > 3) {
            // console.log(`${originRoom.name} ${room.name} ${linearDistance}`);
            return;
        } else {
            // console.log(`${originRoom.name} ${room.name} ${linearDistance}`);
        }
        if (originRoom.controller?.my && originRoom.find(FIND_MY_SPAWNS).length !== 0) {
            sources.forEach(source => {
                const flag = source.pos
                    .lookFor(LOOK_FLAGS)
                    .filter(anyFlag => anyFlag.name.includes(`${room.name}source`))[0];
                const sourceFlagName = flag?.name;
                const spawnName = originRoom.memory.construct.firstSpawnName?.name;
                if (!spawnName || !sourceFlagName) {
                    logger.debug(
                        `No spawnName:${spawnName} or sourceFlagName: ${sourceFlagName} from room ${originRoom.name}`
                    );
                    return;
                }
                if (roomSourcesMemory?.[sourceFlagName]?.roomData?.[originRoom.name]?.pathLength) {
                    logger.debug(`Path data already exists for source ${sourceFlagName} from room ${originRoom.name}`);
                    return;
                }

                if (!roomSourcesMemory[sourceFlagName]) {
                    roomSourcesMemory[sourceFlagName] = {
                        inUse: false,
                        roomData: {}
                    };
                }

                //logger.debug(`正在搜索路径：${spawnName} --> ${sourceFlagName}`);
                const ret = PathFinder.search(
                    Game.spawns[spawnName].pos,
                    { pos: source.pos, range: 1 },
                    { maxOps: 1000 * 50, roomCallback: getCostMatrix }
                );
                if (!ret.incomplete) {
                    logger.debug(`Path found! Length: ${ret.path.length}, From: ${spawnName} To: ${sourceFlagName}`);
                    roomSourcesMemory[sourceFlagName].roomData[originRoom.name] = {
                        sourceRoomName: room.name,
                        sourceName: sourceFlagName,
                        originRoomName: originRoom.name,
                        pathLength: ret.path.length,
                        inUse: false,
                        harvestedEnergyNum: 0
                    };
                }
                // logger.debug(
                //     `路径${spawnName}-->${sourceFlagName} complete:${ret.incomplete ? "false" : "true"} pathLength:${
                //         ret.path.length
                //     }`
                // );
            });
        }
    });

    // power bank 数据
    if (checkHighwayRoomName.test(room.name)) {
        if (!("powerBanks" in room.memory)) {
            room.memory.powerBanks = {};
        }
        const powerBankMemory = room.memory.powerBanks ?? {};
        const powerBanks: StructurePowerBank[] = room.find(FIND_STRUCTURES, {
            filter: i => i.structureType === "powerBank"
        });

        // 删除过时数据
        const listToClear: string[] = [];
        _.forEach(powerBankMemory, (powerBankData, id) => {
            if (!id) return;
            // powerBank数据会在powerBank消失后额外留存2000tick，以保证getPower任务正常运行
            if (powerBankData.decayTime + 2000 < Game.time && !powerBanks.some(powerBank => id === powerBank.id)) {
                listToClear.push(id);
            }
        });
        listToClear.forEach(id => {
            delete powerBankMemory[id];
        });

        // 添加新数据
        powerBanks.forEach((powerBank: StructurePowerBank) => {
            if (!(powerBank.id in powerBankMemory)) {
                const blankSpacePosList = getBlankSpace(powerBank.pos);
                powerBankMemory[powerBank.id] = {
                    decayTime: powerBank.ticksToDecay + Game.time,
                    amount: powerBank.power,
                    x: powerBank.pos.x,
                    y: powerBank.pos.y,
                    roomName: powerBank.pos.roomName,
                    id: powerBank.id,
                    blankSpaceCount: blankSpacePosList.length,
                    isAttackedByOthers: powerBank.hits !== powerBank.hitsMax,
                    isInMyAttack: false,
                    boosted: false
                };
            }
        });
    }

    // invader core 数据
    if (checkControllerRoomName.test(room.name)) {
        if (!("invaderCores" in room.memory)) {
            room.memory.invaderCores = {};
        }
        const invaderCoreMemory = room.memory.invaderCores ?? {};
        const invaderCores: StructureInvaderCore[] = room.find(FIND_STRUCTURES, {
            filter: i => i.structureType === "invaderCore"
        });

        // 删除过时数据
        const listToClear: string[] = [];
        _.forEach(invaderCoreMemory, (invaderCoreData, id) => {
            if (!id) return;
            // invaderCore数据会在powerBank消失后额外留存7000tick，以保证outwardsSource任务正常运行
            if (
                invaderCoreData.decayTime + 7000 < Game.time &&
                !invaderCores.some(invaderCore => id === invaderCore.id)
            ) {
                listToClear.push(id);
            }
        });
        listToClear.forEach(id => {
            delete invaderCoreMemory[id];
        });

        // 添加新数据
        invaderCores.forEach((invaderCore: StructureInvaderCore) => {
            if (!(invaderCore.id in invaderCoreMemory)) {
                const decayTime = invaderCore.effects.find(i => i.effect === EFFECT_COLLAPSE_TIMER)?.ticksRemaining;
                if (!decayTime) throw new Error("no decay time in invader core");
                invaderCoreMemory[invaderCore.id] = {
                    decayTime: decayTime + Game.time,
                    x: invaderCore.pos.x,
                    y: invaderCore.pos.y,
                    roomName: invaderCore.pos.roomName,
                    id: invaderCore.id
                };
            }
        });
    }
}

declare global {
    interface RoomMemory {
        sources?: {
            [sourceFlagName: string]: {
                roomData: { [originRoomName: string]: OutwardsSourceData };
                inUse: boolean;
                originRoomName?: string;
            };
        };
        owner?: string;
        powerBanks?: {
            [powerBankId: string]: PowerBankData;
        };
        invaderCores?: {
            [invaderCoreId: string]: InvaderCoreData;
        };
        controller?: {
            reserveEndTime: number;
        };
        invaders?: {
            decayTime: number;
        };
    }
}
export interface OutwardsSourceData {
    sourceRoomName: string;
    sourceName: string;
    originRoomName: string;
    pathLength: number;
    path?: string[];
    maintainRoad?: boolean;
    roadHasBuilt?: boolean;
    inUse: boolean;
    harvestedEnergyNum: number;
}
export interface PowerBankData {
    decayTime: number;
    amount: number;
    originRoomName?: string;
    moveTime?: number;
    x: number;
    y: number;
    roomName: string;
    id: string;
    blankSpaceCount: number;
    isAttackedByOthers: boolean;
    isInMyAttack: boolean;
    boosted: boolean;
}
export interface InvaderCoreData {
    decayTime: number;
    x: number;
    y: number;
    roomName: string;
    id: string;
}
