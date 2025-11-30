import { CreepGroup } from "frame/creep/group";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export const scoutRoom: TaskObject<maintainRoomTaskArgs> = {
    name: "scoutRoom",
    description: "scoutRoom",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = `${room.name}s`;
        return "end";
    },
    justFinished() {
        return "end";
    }
};
