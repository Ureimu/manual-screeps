import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
export const OBuildGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}ob${sourceName}`;
export const createOBuildGroup: TaskObject<outwardsSourceTaskArgs> = {
    name: "createOBuildGroup",
    description: "createOBuildGroup",
    start() {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const creepName = `${roomName}ob${sourceName}`;
        const creepGroupName = `${roomName}ob${sourceName}`;
        SpawnPool.addCreep({
            creepName,
            creepBody: "oBuilder",
            priority: "4",
            roomName,
            readyCondition: "shift",
            subCond: "outwardsSourceBuilder"
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
