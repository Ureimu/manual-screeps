import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { checkHighwayRoomName } from "utils/roomNameUtils";
import { PosStr } from "utils/RoomPositionToStr";

export function recordRoomData(room: Room): void {
    // console.log(`[Debug] Starting recordRoomData for room: ${room.name}`);
    FlagMaintainer.refresh({
        roomName: room.name,
        typeList: FlagMaintainer.getTypeList(["source", "controller"])
    });

    room.memory.owner = room.controller?.owner?.username;

    // 外矿数据
    const sources = room.find(FIND_SOURCES);
    // console.log(sources.map(i => `${i.room.name},${i.pos.x},${i.pos.y}`));
    if (!room.memory.sources) room.memory.sources = {};
    const roomSourcesMemory = room.memory.sources;
    _.forEach(Game.rooms, originRoom => {
        // console.log(`[Debug] Processing originRoom: ${originRoom.name}`);
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
                    // console.log(
                    //     `[Debug] No spawnName:${spawnName} or sourceFlagName: ${sourceFlagName} from room ${originRoom.name}`
                    // );
                    return;
                }
                if (roomSourcesMemory?.[sourceFlagName]?.roomData?.[originRoom.name]?.pathLength) {
                    // console.log(
                    //     `[Debug] Path data already exists for source ${sourceFlagName} from room ${originRoom.name}`
                    // );
                    return;
                }

                if (!roomSourcesMemory[sourceFlagName]) {
                    roomSourcesMemory[sourceFlagName] = {
                        inUse: false,
                        roomData: {}
                    };
                }

                //console.log(`正在搜索路径：${spawnName} --> ${sourceFlagName}`);
                const ret = PathFinder.search(
                    Game.spawns[spawnName].pos,
                    { pos: source.pos, range: 1 },
                    { maxOps: 1000 * 50, roomCallback: getCostMatrix }
                );
                if (!ret.incomplete) {
                    // console.log(
                    //     `[Debug] Path found! Length: ${ret.path.length}, From: ${spawnName} To: ${sourceFlagName}`
                    // );
                    roomSourcesMemory[sourceFlagName].roomData[originRoom.name] = {
                        sourceRoomName: room.name,
                        sourceName: sourceFlagName,
                        originRoomName: originRoom.name,
                        pathLength: ret.path.length,
                        inUse: false,
                        harvestedEnergyNum: 0
                    };
                }
                // console.log(
                //     `路径${spawnName}-->${sourceFlagName} complete:${ret.incomplete ? "false" : "true"} pathLength:${
                //         ret.path.length
                //     }`
                // );
            });
        }
    });

    // power bank 数据
    if (checkHighwayRoomName.test(room.name)) {
        if (!("powerBank" in room.memory)) {
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
            if (!powerBanks.some(powerBank => id === powerBank.id)) {
                listToClear.push(id);
            }
        });
        listToClear.forEach(id => {
            delete powerBankMemory[id];
        });

        // 添加新数据
        powerBanks.forEach((powerBank: StructurePowerBank) => {
            if (!(powerBank.id in powerBankMemory)) {
                powerBankMemory[powerBank.id] = {
                    decayTime: powerBank.ticksToDecay + Game.time,
                    amount: powerBank.power,
                    x: powerBank.pos.x,
                    y: powerBank.pos.y,
                    roomName: powerBank.pos.roomName,
                    id: powerBank.id
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
    }
}
export interface OutwardsSourceData {
    sourceRoomName: string;
    sourceName: string;
    originRoomName: string;
    pathLength: number;
    path?: string[];
    inUse: boolean;
    harvestedEnergyNum: number;
}
export interface PowerBankData {
    decayTime: number;
    amount: number;
    originRoomName?: string;
    x: number;
    y: number;
    roomName: string;
    id: string;
}
