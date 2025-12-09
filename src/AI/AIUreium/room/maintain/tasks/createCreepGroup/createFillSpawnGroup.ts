import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const createFillSpawnGroup: TaskObject<maintainRoomTaskArgs, maintainRoomTaskArgs> = {
    name: "createFillSpawnGroup",
    description: "createFillSpawnGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}fs`;
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
        for (let index = 0; index < 2; index++) {
            createCreepGroup(room, creepGroupName, index);
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};

function createCreepGroup(room: Room, creepGroupName: string, index: number) {
    const creepName = `${creepGroupName}${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "carrier",
        priority: 11,
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
