import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const removeUpgraderToOne: TaskObject<maintainRoomTaskArgs> = {
    name: "removeUpgraderToOne",
    description: "removeUpgraderToOne",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}up`;
        for (let index = 1; index < 2; index++) {
            removeCreep(room, creepGroupName, index);
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};

function removeCreep(room: Room, creepGroupName: string, index: number) {
    const creepName = `${creepGroupName}${index}`;
    SpawnPool.setCreepProperties({
        creepName,
        roomName: room.name,
        readyCondition: "notLoop"
    });
}
