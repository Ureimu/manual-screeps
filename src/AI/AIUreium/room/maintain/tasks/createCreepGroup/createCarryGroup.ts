import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../../type";

export const carryGroupName = (roomName: string): string => `${roomName}c`;
export const createCarryGroup: maintainRoomTaskObject = {
    name: "createCarryGroup",
    description: "createCarryGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = carryGroupName(room.name);
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
        for (let index = 0; index < 1; index++) {
            createCreepGroup(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "carrier",
            projectName: maintainRoomProjectName
        });
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
        priority: 9,
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
