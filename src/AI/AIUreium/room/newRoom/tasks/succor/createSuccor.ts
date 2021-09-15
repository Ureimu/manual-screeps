import { CreepBody } from "frame/creep/body";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { newRoomTaskArgs } from "../../taskRelation";

export const createSuccor: TaskObject<newRoomTaskArgs> = {
    name: "createSuccor",
    description: "createSuccor",
    working(spawnRoomName, claimRoomName) {
        createSuccorCreep(spawnRoomName, claimRoomName);
        return "end";
    }
};

function createSuccorCreep(spawnRoomName: string, claimRoomName: string): void {
    const spawnRoom = Game.rooms[spawnRoomName];
    const creepGroupName = `${spawnRoomName}succor${claimRoomName}`;
    const creepBodyConfigName = `${spawnRoomName}succor${claimRoomName}`;
    const creepName = `${spawnRoomName}succor${claimRoomName}`;

    CreepBody.createConfig({ creepBodyConfigName });
    CreepBody.setConfig({
        creepBodyConfigName,
        controllerLevel: "3",
        creepBodyConfig: "m6c3w3"
    });
    CreepBody.setConfig({
        creepBodyConfigName,
        controllerLevel: "5",
        creepBodyConfig: "m12c6w6"
    });
    CreepGroup.create({ creepGroupName, mode: "role", groupArguments: [spawnRoomName, claimRoomName].join(",") });
    SpawnPool.addCreep({
        creepName,
        creepBody: creepBodyConfigName,
        priority: "2",
        roomName: spawnRoom.name,
        readyCondition: "loop"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
    CreepGroup.setCreepGroupProperties({ creepGroupName, roleName: "succor1" });
}
