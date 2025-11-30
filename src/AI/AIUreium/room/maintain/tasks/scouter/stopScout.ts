import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const stopScout: TaskObject<maintainRoomTaskArgs> = {
    name: "stopScout",
    description: "stopScout",
    start(roomName) {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}s`;

        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.setCreepProperties({ creepName, roomName, readyCondition: "notLoop" });
        }); // 暂停所有scout creep

        return "end";
    },
    justFinished() {
        return "end";
    }
};
