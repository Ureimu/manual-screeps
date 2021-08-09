import { getCostMatrix } from "construct/composition/gridLayout/costMatrix";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";

export function recordRoomData(room: Room): void {
    FlagMaintainer.refresh({ roomName: room.name, typeList: FlagMaintainer.getTypeList(["source", "controller"]) });
    const sources = room.find(FIND_SOURCES);

    if (!room.memory.sources) room.memory.sources = {};
    const roomSourcesMemory = room.memory.sources;
    _.forEach(Game.rooms, originRoom => {
        const linearDistance = Game.map.getRoomLinearDistance(originRoom.name, room.name);
        if (linearDistance > 3) {
            console.log(`${originRoom.name} ${room.name} ${linearDistance}`);
            return;
        } else {
            console.log(`${originRoom.name} ${room.name} ${linearDistance}`);
        }
        if (originRoom.controller?.my && originRoom.find(FIND_MY_SPAWNS).length !== 0) {
            sources.forEach(source => {
                const flag = source.pos
                    .lookFor(LOOK_FLAGS)
                    .filter(anyFlag => anyFlag.name.includes(`${room.name}source`))[0];
                const sourceFlagName = flag.name;
                const spawnName = originRoom.memory.construct.firstSpawnName.name;
                if (roomSourcesMemory?.[sourceFlagName]?.[originRoom.name]?.pathLength) {
                    return;
                }

                if (!roomSourcesMemory[sourceFlagName]) {
                    roomSourcesMemory[sourceFlagName] = {};
                }
                console.log(`正在搜索路径：${spawnName} --> ${sourceFlagName}`);
                const ret = PathFinder.search(
                    Game.spawns[spawnName].pos,
                    { pos: source.pos, range: 1 },
                    { maxOps: 1000 * 50, roomCallback: getCostMatrix }
                );
                if (!ret.incomplete) {
                    console.log(`记录路径`);
                    roomSourcesMemory[sourceFlagName][originRoom.name] = {
                        sourceRoomName: room.name,
                        sourceName: sourceFlagName,
                        originRoomName: originRoom.name,
                        pathLength: ret.path.length,
                        inUse: false
                    };
                }
                console.log(
                    `路径${spawnName}-->${sourceFlagName} complete:${ret.incomplete ? "false" : "true"} pathLength:${
                        ret.path.length
                    }`
                );
            });
        }
    });
}

declare global {
    interface RoomMemory {
        sources?: {
            [sourceFlagName: string]: {
                [originRoomName: string]: OutwardsSourceData;
            };
        };
    }
}

export interface OutwardsSourceData {
    sourceRoomName: string;
    sourceName: string;
    originRoomName: string;
    pathLength: number;
    inUse: boolean;
}
