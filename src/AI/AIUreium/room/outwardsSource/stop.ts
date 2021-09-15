import { SpawnPool } from "frame/spawn/spawnPool";
import { outwardsSourceTaskArgs } from "./taskRelation";

export function stopOutwardsSource(...args: outwardsSourceTaskArgs): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    const outwardsHarvestCreepNameList = [`${originRoomName}oh${sourceName}`];
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
    const room = Game.rooms[originRoomName];
    delete room.memory.AIUreium.outwardsSource[sourceRoomName][sourceName];
}
