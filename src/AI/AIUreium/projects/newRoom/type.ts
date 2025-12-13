import { TaskObject } from "utils/Project";

export type MemoryAddressArgs = Parameters<(spawnRoomName: string, claimRoomName: string) => void>;
export type newRoomTaskArgs = Parameters<(spawnRoomName: string, claimRoomName: string) => void>;
export const newRoomProjectName = "newRoom";
export type newRoomProjectMemoryType = {};
export type newRoomTaskObject = TaskObject<newRoomTaskArgs, MemoryAddressArgs, newRoomProjectMemoryType>;
