import { maintainRoomTaskObject } from "../../type";

export const scoutRoom: maintainRoomTaskObject = {
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
