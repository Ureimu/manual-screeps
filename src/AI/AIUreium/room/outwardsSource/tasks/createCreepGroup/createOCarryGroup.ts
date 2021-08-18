import { CreepBody } from "frame/creep/body";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
export const OCarryGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}oc${sourceName}`;
export const createOCarryGroup: TaskObject<outwardsSourceTaskArgs> = {
    name: "createOCarryGroup",
    description: "createOCarryGroup",
    start() {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const sourceData = Memory.rooms[sourceRoomName].sources?.[sourceName]?.roomData[roomName];
        if (!sourceData) return "running";
        const pathLength = sourceData.pathLength;
        const carryNum = Math.ceil(pathLength * 0.2);
        const moveNum = Math.ceil(pathLength * 0.2);
        const creepName = OCarryGroupCreepName(roomName, sourceName);
        const creepGroupName = OCarryGroupCreepName(roomName, sourceName);
        CreepBody.createConfig({ creepBodyConfigName: creepName });
        CreepBody.setConfig({
            creepBodyConfigName: creepName,
            controllerLevel: "0",
            creepBodyConfig: `c${carryNum}m${moveNum}`
        });
        SpawnPool.addCreep({
            creepName,
            creepBody: creepName,
            priority: "2",
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
