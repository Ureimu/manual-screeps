import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const createUpgradeGroup: TaskObject<maintainRoomTaskArgs> = {
    name: "createUpgradeGroup",
    description: "createUpgradeGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}up`;
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
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
    const creepName = `${creepGroupName}${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "worker",
        priority: "8",
        roomName: room.name,
        readyCondition: "shift",
        subCond: "upgrader"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
