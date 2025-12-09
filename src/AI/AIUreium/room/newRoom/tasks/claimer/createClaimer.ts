import { TaskObject } from "utils/Project";
import { MemoryAddressArgs, newRoomProjectName, newRoomTaskArgs } from "../../type";
import { CreepBody } from "frame/creep/body";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";

export const createClaimer: TaskObject<newRoomTaskArgs, MemoryAddressArgs> = {
    name: "createClaimer",
    description: "createClaimer",
    working(spawnRoomName, claimRoomName) {
        createClaimCreep(spawnRoomName, claimRoomName);
        return "end";
    }
};

function createClaimCreep(spawnRoomName: string, claimRoomName: string): void {
    const spawnRoom = Game.rooms[spawnRoomName];
    const creepGroupName = `${spawnRoomName}claim${claimRoomName}`;
    const creepBodyConfigName = `${spawnRoomName}claim${claimRoomName}`;
    const creepName = `${spawnRoomName}claim${claimRoomName}`;

    CreepBody.createConfig({ creepBodyConfigName });
    CreepBody.setConfig({
        creepBodyConfigName,
        controllerLevel: "2",
        creepBodyConfig: "i1m1"
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
    CreepGroup.setCreepGroupProperties({ creepGroupName, roleName: "claimer1", projectName: newRoomProjectName });
}
