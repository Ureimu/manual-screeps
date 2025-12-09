import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomTaskObject } from "../../type";

export const createCollectGroup: maintainRoomTaskObject = {
    name: "createCollectGroup",
    description: "createCollectGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}col`;
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
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
        priority: 6,
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
