import { getCostMatrix } from "frame/construct/composition/gridLayout/costMatrix";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { PosStr } from "utils/RoomPositionToStr";

export function recordRoomData(room: Room): void {
    FlagMaintainer.refresh({ roomName: room.name, typeList: FlagMaintainer.getTypeList(["source", "controller"]) });
    const sources = room.find(FIND_SOURCES);
    room.memory.owner = room.controller?.owner?.username;
    if (!room.memory.sources) room.memory.sources = {};
    const roomSourcesMemory = room.memory.sources;
    _.forEach(Game.rooms, originRoom => {
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
                const spawnName = originRoom.memory.construct.firstSpawnName.name;
                if (roomSourcesMemory?.[sourceFlagName]?.roomData?.[originRoom.name]?.pathLength) {
                    return;
                }

                if (!roomSourcesMemory[sourceFlagName]) {
                    roomSourcesMemory[sourceFlagName] = {
                        inUse: false,
                        roomData: {}
                    };
                }

                // console.log(`正在搜索路径：${spawnName} --> ${sourceFlagName}`);
                const ret = PathFinder.search(
                    Game.spawns[spawnName].pos,
                    { pos: source.pos, range: 1 },
                    { maxOps: 1000 * 50, roomCallback: getCostMatrix }
                );
                if (!ret.incomplete) {
                    // console.log(`记录路径`);
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
