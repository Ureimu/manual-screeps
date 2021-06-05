import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../../taskRelation";

export const createScoutGroup: TaskObject<RoomTaskArgs> = {
    name: "createScoutGroup",
    description: "createScoutGroup",
    start() {
        return "end";
    },
    working(room) {
        const creepGroupName = `${room.name}s`;
        CreepGroup.create({ creepGroupName });
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
        creepBody: "scouter",
        priority: "5",
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
