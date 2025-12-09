import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { outwardsSourceTaskObject } from "../../type";
export const OHarvestGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}oh${sourceName}`;
export const createOHarvestGroup: outwardsSourceTaskObject = {
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
            readyCondition: "shift",
            subCond: "outwardsSourceWorker"
        });
        CreepGroup.create({
            creepGroupName,
            mode: "route",
            groupArguments: [roomName, sourceRoomName, sourceName].join(",")
        });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
