import { CreepGroup } from "creep/group";
import { FlagMaintainer } from "flagMaintainer";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const stopCarrySource: TaskObject<maintainRoomTaskArgs> = {
    name: "stopCarrySource",
    description: "stopCarrySource",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "container"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}c`;

        Memory.creepGroups[creepGroupName].creepNameList.forEach((creepName, index) => {
            CreepGroup.deleteCreep({ creepName, creepGroupName });
            SpawnPool.deleteCreep({ creepName, roomName: room.name });
        }); // 删除所有creep

        return "end";
    },
    justFinished() {
        return "end";
    }
};
