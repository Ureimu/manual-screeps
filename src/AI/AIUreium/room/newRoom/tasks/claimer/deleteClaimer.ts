import { TaskObject } from "utils/Project";
import { MemoryAddressArgs, newRoomTaskArgs } from "../../type";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";

export const deleteClaimer: TaskObject<newRoomTaskArgs, MemoryAddressArgs> = {
    name: "deleteClaimer",
    description: "deleteClaimer",
    start(spawnRoomName, claimRoomName) {
        const claimRoom = Game.rooms[claimRoomName];
        if (!claimRoom) {
            return "running";
        }
        if (claimRoom.controller?.my) {
            claimRoom.find(FIND_STRUCTURES).forEach(i => i.destroy());
            return "end";
        }
        return "running";
    },
    working(spawnRoomName, claimRoomName) {
        deleteClaimCreep(spawnRoomName, claimRoomName);
        return "end";
    }
};

export function deleteClaimCreep(spawnRoomName: string, claimRoomName: string): void {
    const creepGroupName = `${spawnRoomName}claim${claimRoomName}`;
    const creepBodyConfigName = `${spawnRoomName}claim${claimRoomName}`;
    const creepName = `${spawnRoomName}claim${claimRoomName}`;
    SpawnPool.deleteCreep({ roomName: spawnRoomName, creepName });
    CreepGroup.deleteCreepGroup({ creepGroupName });
    if (Game.creeps[creepName]) Game.creeps[creepName].suicide();
}
