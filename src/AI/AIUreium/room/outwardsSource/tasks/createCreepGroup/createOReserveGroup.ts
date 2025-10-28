import { CreepBody } from "frame/creep/body";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
export const OReserveGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}or${sourceName}`;
export const createOReserveGroup: TaskObject<outwardsSourceTaskArgs> = {
    name: "createOReserveGroup",
    description: "createOReserveGroup",
    start(roomName) {
        const level = Game.rooms[roomName].controller?.level ?? 0;
        if (level < 6) return "running";
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const sourceData = Memory.rooms[sourceRoomName].sources?.[sourceName]?.roomData[roomName];
        if (!sourceData) return "running";
        const creepName = OReserveGroupCreepName(roomName, sourceName);
        const creepGroupName = OReserveGroupCreepName(roomName, sourceName);
        CreepBody.createConfig({ creepBodyConfigName: creepName });
        CreepBody.setConfig({
            creepBodyConfigName: creepName,
            controllerLevel: "0",
            creepBodyConfig: `m2i2`
        });
        SpawnPool.addCreep({
            creepName,
            creepBody: creepName,
            priority: "2",
            roomName,
            readyCondition: "shift",
            subCond: "outwardsSourceReserver"
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
