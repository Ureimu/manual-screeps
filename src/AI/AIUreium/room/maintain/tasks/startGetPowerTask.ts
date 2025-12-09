import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../type";

export const startGetPowerTask: TaskObject<maintainRoomTaskArgs, maintainRoomTaskArgs> = {
    name: "startGetPowerTask",
    description: "startGetPowerTask",
    start(roomName) {
        const room = Game.rooms[roomName];
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        room.memory.AIUreium.getPowerData = { hasStarted: true, startTime: Game.time };
        return "end";
    },
    justFinished() {
        return "end";
    }
};

declare global {
    interface AIUreiumRoomMemory {
        /**
         * 标识房间是否达到开始getPower的要求的数据。
         * 注意不要和标识当前getPower任务是否运行搞混了，
         * 那个数据在roomMemory.status.getPower
         */
        getPowerData?: {
            hasStarted: boolean;
            startTime: number;
        };
    }
}
