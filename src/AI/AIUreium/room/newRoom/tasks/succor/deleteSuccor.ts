import { TaskObject } from "utils/Project";
import { newRoomTaskArgs } from "../../taskRelation";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";

export const deleteSuccor: TaskObject<newRoomTaskArgs> = {
    name: "deleteSuccor",
    description: "deleteSuccor",
    start(spawnRoomName, claimRoomName) {
        const claimRoom = Game.rooms[claimRoomName];
        if (!claimRoom) {
            return "running";
        }
        if (claimRoom.find(FIND_MY_SPAWNS).length > 0) return "end";
        return "running";
    },
    working(spawnRoomName, claimRoomName) {
        deleteSuccorCreep(spawnRoomName, claimRoomName);
        return "end";
    }
};

export function deleteSuccorCreep(spawnRoomName: string, claimRoomName: string): void {
    const creepGroupName = `${spawnRoomName}succor${claimRoomName}`;
    const creepBodyConfigName = `${spawnRoomName}succor${claimRoomName}`;
    const creepName = `${spawnRoomName}succor${claimRoomName}`;
    SpawnPool.deleteCreep({ roomName: spawnRoomName, creepName });
    CreepGroup.deleteCreepGroup({ creepGroupName });
    if (Game.creeps[creepName]) Game.creeps[creepName].suicide();
}
