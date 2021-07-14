import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../../taskRelation";

export const createCollectGroup: TaskObject<RoomTaskArgs> = {
    name: "createCollectGroup",
    description: "createCollectGroup",
    start() {
        return "end";
    },
    working(room) {
        const creepGroupName = `${room.name}col`;
        CreepGroup.create({ creepGroupName, mode: "route" });
        for (let index = 0; index < 1; index++) {
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
        priority: "6",
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
