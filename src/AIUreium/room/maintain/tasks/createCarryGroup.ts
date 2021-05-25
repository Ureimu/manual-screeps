import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const createCarryGroup: TaskObject<RoomTaskArgs> = {
    name: "createCarryGroup",
    description: "createCarryGroup",
    start() {
        return "end";
    },
    working(room) {
        const routeName = `${room.name}c`;
        CreepGroup.create({ routeName, creepGroupName: routeName });
        for (let index = 0; index < 2; index++) {
            createCreepGroup(room, routeName, index);
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
function createCreepGroup(room: Room, routeName: string, index: number) {
    const creepName = `${room.name}c${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "carrier",
        priority: "9",
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName: routeName });
}
