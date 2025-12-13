import { TaskObject } from "utils/Project";

export type maintainRoomTaskArgs = [roomName: string];
export const maintainRoomProjectName = "maintainRoomProject";
export type maintainRoomProjectMemoryType = {};
export type maintainRoomTaskObject = TaskObject<
    maintainRoomTaskArgs,
    maintainRoomTaskArgs,
    maintainRoomProjectMemoryType
>;
