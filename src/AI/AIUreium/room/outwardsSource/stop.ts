import { SpawnPool } from "frame/spawn/spawnPool";
import { getOutwardsHarvestProject } from "./taskRelation";
import { outwardsSourceTaskArgs } from "./type";

export function stopOutwardsSource(...args: outwardsSourceTaskArgs): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    const outwardsHarvestCreepNameList = [
        `${originRoomName}oh${sourceName}`,
        `${originRoomName}oc${sourceName}`,
        `${originRoomName}or${sourceName}`,
        `${originRoomName}ob${sourceName}`
    ];
    const spawnPool = Memory.rooms[originRoomName].spawnPool;
    const spawnPoolCreepNameList = Object.keys(spawnPool);
    outwardsHarvestCreepNameList.forEach(creepNameHead =>
        spawnPoolCreepNameList.forEach(spawnPoolCreepName => {
            if (spawnPoolCreepName.includes(creepNameHead)) {
                SpawnPool.setCreepProperties({
                    creepName: spawnPoolCreepName,
                    roomName: originRoomName,
                    readyCondition: "notLoop"
                });
                const creep = Game.creeps[spawnPoolCreepName];
                if (creep) {
                    creep.suicide();
                }
            }
        })
    );

    getOutwardsHarvestProject(originRoomName, sourceRoomName, sourceName).stop();
}
