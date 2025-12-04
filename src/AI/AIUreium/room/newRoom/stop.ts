import { stopProjectCreeps } from "frame/utils";
import { newRoomProjectName, newRoomTaskArgs } from "./type";

export function stopNewRoom(...args: newRoomTaskArgs): void {
    const [spawnRoomName, claimRoomName] = args;

    const projectName = newRoomProjectName;
    stopProjectCreeps(spawnRoomName, projectName);
}
