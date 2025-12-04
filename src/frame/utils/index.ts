import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";

export function stopProjectCreeps(roomName: string, projectName: string | undefined) {
    const projectCreepGroupNameSet = new Set<string>();
    _.forEach(Memory.rooms[roomName].spawnPool, spawnDetail => {
        const groupName = Memory.creeps[spawnDetail.creepName].groupName;
        if (Memory.creepGroups[groupName]?.projectName === projectName) {
            projectCreepGroupNameSet.add(groupName);
        }
    });
    for (const creepGroupName of projectCreepGroupNameSet) {
        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.deleteCreep({ creepName, roomName: roomName });
            if (Game.creeps[creepName]) {
                Game.creeps[creepName].suicide();
            }
        });
        CreepGroup.deleteCreepGroup({ creepGroupName });
    }
}
