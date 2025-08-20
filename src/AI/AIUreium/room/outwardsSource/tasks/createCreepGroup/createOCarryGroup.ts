import { MaxOutwardsSourcePathLength } from "AI/AIUreium/mainControl/outwardsSource/constant";
import { CreepBody } from "frame/creep/body";
import { ControllerLevels } from "frame/creep/body/type";
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
        if (pathLength === 0) {
            console.log("sourceData.pathLength should not be zero");
            return "running";
        }

        const creepName = OCarryGroupCreepName(roomName, sourceName);
        const creepGroupName = OCarryGroupCreepName(roomName, sourceName);
        CreepBody.createConfig({ creepBodyConfigName: creepName });

        for (let index = 0; index <= 8; index++) {
            // 0.2 is best when no reserver.
            let ratio = 0.2;
            if (index >= 6) {
                ratio = 0.28;
            }
            const carryNum = Math.ceil(pathLength * ratio);
            const moveNum = Math.ceil(pathLength * ratio);
            CreepBody.setConfig({
                creepBodyConfigName: creepName,
                controllerLevel: String(index) as ControllerLevels,
                creepBodyConfig: `c${carryNum}m${moveNum}`
            });
        }

        SpawnPool.addCreep({
            creepName,
            creepBody: creepName,
            priority: "2",
            roomName,
            readyCondition: "loop"
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
