import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
export const OHarvestGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}oh${sourceName}`;
export const createOHarvestGroup: TaskObject<outwardsSourceTaskArgs> = {
    name: "createOHarvestGroup",
    description: "createOHarvestGroup",
    start() {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const creepName = `${roomName}oh${sourceName}`;
        const creepGroupName = `${roomName}oh${sourceName}`;
        SpawnPool.addCreep({
            creepName,
            creepBody: "oHarvester",
            priority: "4",
            roomName,
            readyCondition: "loop"
        });
        CreepGroup.create({ creepGroupName, mode: "route" });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
