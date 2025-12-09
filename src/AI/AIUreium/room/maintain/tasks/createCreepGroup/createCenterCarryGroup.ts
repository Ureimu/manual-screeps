import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const createCenterCarryGroup: TaskObject<maintainRoomTaskArgs, maintainRoomTaskArgs> = {
    name: "createCenterCarryGroup",
    description: "createCenterCarryGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = getCreepGroupName(roomName);
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

const getCreepGroupName = (roomName: string) => `${roomName}CenterCarry`;
export const getCenterCarrierCreepName = (roomName: string, index: number) => `${getCreepGroupName(roomName)}${index}`;

function createCreepGroup(room: Room, creepGroupName: string, index: number) {
    const creepName = getCenterCarrierCreepName(room.name, 0);
    SpawnPool.addCreep({
        creepName,
        creepBody: "centerCarrier",
        priority: 8,
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
