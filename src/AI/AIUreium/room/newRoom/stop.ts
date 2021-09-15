import { newRoomTaskArgs } from "./taskRelation";

export function stopNewRoom(...args: newRoomTaskArgs): void {
    const [spawnRoomName, claimRoomName] = args;
    const mainRoom = Game.rooms[spawnRoomName];
    if (mainRoom.memory.AIUreium.newRoom[claimRoomName]) {
        delete mainRoom.memory.AIUreium.newRoom[claimRoomName];
    }
}
