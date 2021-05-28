import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const createBuildGroup: TaskObject<RoomTaskArgs> = {
    name: "createBuildGroup",
    description: "createBuildGroup",
    start() {
        return "end";
    },
    working(room) {
        const creepGroupName = `${room.name}build`;
        CreepGroup.create({ creepGroupName });
        for (let index = 0; index < 2; index++) {
            addCreep(room, creepGroupName, index);
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};

function addCreep(room: Room, creepGroupName: string, index: number) {
    const creepName = `${room.name}build${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "worker",
        priority: "7",
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
