import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const MineCarryGroupName = (roomName: string): string => `${roomName}cm`;
export const createMineCarryGroup: TaskObject<maintainRoomTaskArgs> = {
    name: "createMineCarryGroup",
    description: "createMineCarryGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepName = MineCarryGroupName(roomName);
        const creepGroupName = MineCarryGroupName(roomName);
        SpawnPool.addCreep({
            creepName,
            creepBody: "carrier",
            priority: "3",
            roomName: room.name,
            readyCondition: "shift",
            subCond: "mineralMiner"
        });
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
