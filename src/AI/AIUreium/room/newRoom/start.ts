import { newRoomTaskArgs } from "./taskRelation";

export function startNewRoom(...args: newRoomTaskArgs): void {
    const [spawnRoomName, claimRoomName] = args;
    const mainRoom = Game.rooms[spawnRoomName];
    if (!mainRoom.memory.AIUreium.newRoom[claimRoomName]) {
        mainRoom.memory.AIUreium.newRoom[claimRoomName] = {};
    }
}
