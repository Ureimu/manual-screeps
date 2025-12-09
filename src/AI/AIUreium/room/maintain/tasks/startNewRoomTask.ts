import { maintainRoomTaskObject } from "../type";

export const startNewRoomTask: maintainRoomTaskObject = {
    name: "startNewRoomTask",
    description: "startNewRoomTask",

    working(roomName) {
        const room = Game.rooms[roomName];
        room.memory.AIUreium.newRoomData = { hasStarted: true, startTime: Game.time };
        return "end";
    }
};

declare global {
    interface AIUreiumRoomMemory {
        newRoomData?: {
            hasStarted: boolean;
            startTime: number;
        };
    }
}
