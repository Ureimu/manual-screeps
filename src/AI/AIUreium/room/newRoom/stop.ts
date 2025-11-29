import { getNewRoomProject, newRoomTaskArgs } from "./taskRelation";

export function stopNewRoom(...args: newRoomTaskArgs): void {
    const [spawnRoomName, claimRoomName] = args;

    getNewRoomProject(spawnRoomName, claimRoomName).stop();
}
