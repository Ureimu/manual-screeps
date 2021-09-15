import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../taskRelation";

export const startNewRoomTask: TaskObject<maintainRoomTaskArgs> = {
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
