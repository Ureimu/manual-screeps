import { TaskObject } from "utils/Project";
import { newRoomTaskArgs } from "../../type";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "newRoom.deleteSuccor");
export const deleteSuccor: TaskObject<newRoomTaskArgs> = {
    name: "deleteSuccor",
    description: "deleteSuccor",
    start(spawnRoomName, claimRoomName) {
        const claimRoom = Game.rooms[claimRoomName];
        if (!claimRoom) {
            return "running";
        }
        if (claimRoom.find(FIND_MY_SPAWNS).length > 0) return "end";
        if (!claimRoom.controller?.my) {
            logger.log("claimRoom has lost control. succor end");
            return "end";
        }
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
    const creepNameList = [creepName];
    const spawnPool = Memory.rooms[spawnRoomName].spawnPool;
    const spawnPoolCreepNameList = Object.keys(spawnPool);
    creepNameList.forEach(creepNameHead =>
        spawnPoolCreepNameList.forEach(spawnPoolCreepName => {
            if (spawnPoolCreepName.includes(creepNameHead)) {
                SpawnPool.deleteCreep({ roomName: spawnRoomName, creepName: spawnPoolCreepName });
                const creep = Game.creeps[spawnPoolCreepName];
                if (creep) {
                    creep.suicide();
                }
            }
        })
    );

    CreepGroup.deleteCreepGroup({ creepGroupName });
}
