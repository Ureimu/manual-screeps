import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../taskRelation";

export const startOutwardsSource: TaskObject<maintainRoomTaskArgs> = {
    name: "startOutwardsSource",
    description: "startOutwardsSource",
    start(roomName) {
        const room = Game.rooms[roomName];
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        room.memory.AIUreium.outwardsSourceData = { hasStarted: true, startTime: Game.time };
        return "end";
    },
    justFinished() {
        return "end";
    }
};

declare global {
    interface AIUreiumRoomMemory {
        outwardsSourceData?: {
            hasStarted: boolean;
            startTime: number;
        };
    }
}
