import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../../type";

export const createKeepLevelGroup: maintainRoomTaskObject = {
    name: "createKeepLevelGroup",
    description: "createKeepLevelGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}lk`;
        CreepGroup.create({ creepGroupName, mode: "role", groupArguments: "" });
        for (let index = 0; index < 1; index++) {
            createCreepGroup(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "levelKeeper",
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
        creepBody: "levelKeeper",
        priority: 8,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "levelKeeper"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
