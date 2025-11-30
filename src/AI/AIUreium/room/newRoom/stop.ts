import { getNewRoomProject } from "./taskRelation";
import { newRoomTaskArgs } from "./type";

export function stopNewRoom(...args: newRoomTaskArgs): void {
    const [spawnRoomName, claimRoomName] = args;

    getNewRoomProject(spawnRoomName, claimRoomName).stop();
}
