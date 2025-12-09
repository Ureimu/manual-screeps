import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const energyCarryGroupName = (roomName: string): string => `${roomName}ce`;
export const createEnergyCarryGroup: TaskObject<maintainRoomTaskArgs, maintainRoomTaskArgs> = {
    name: "createEnergyCarryGroup",
    description: "createEnergyCarryGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = energyCarryGroupName(room.name);
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
        priority: 9,
        roomName: room.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
