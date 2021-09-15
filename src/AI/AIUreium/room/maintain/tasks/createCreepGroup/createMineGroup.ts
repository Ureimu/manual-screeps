import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const MineGroupName = (roomName: string): string => `${roomName}mi`;
export const createMineGroup: TaskObject<maintainRoomTaskArgs> = {
    name: "createMineGroup",
    description: "createMineGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepName = MineGroupName(roomName);
        const creepGroupName = MineGroupName(roomName);
        SpawnPool.addCreep({
            creepName,
            creepBody: "miner",
            priority: "4",
            roomName: room.name,
            readyCondition: "loop"
        });
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
