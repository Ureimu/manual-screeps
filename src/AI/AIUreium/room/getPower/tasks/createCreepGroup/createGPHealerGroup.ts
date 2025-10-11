import { calcGetPowerSpawnTime } from "AI/AIUreium/mainControl/getPower/calcSpawnTime";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../../taskRelation";

export const getGPHealerGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gph-${powerBankRoomName}-${powerBankId}`;

export const createGPHealerGroup: TaskObject<getPowerTaskArgs> = {
    name: "createGPHealerGroup",
    description: "createGPHealerGroup",
    start(roomName, powerBankRoomName, powerBankId) {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const creepGroupName = getGPHealerGroupName(roomName, powerBankRoomName, powerBankId);
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${roomName},${powerBankRoomName},${powerBankId}`
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "gpHealer" });

        return "end";
    },
    justFinished() {
        return "end";
    }
};

function createNewCreep(room: Room, healerCreepGroupName: string, index: number) {
    const healerCreepName = `${healerCreepGroupName}-${index}`;
    SpawnPool.addCreep({
        creepName: healerCreepName,
        creepBody: "gpHealer",
        priority: `${4.95 - index * 0.1}`,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "gpWorker"
    });
    CreepGroup.addCreep({ creepName: healerCreepName, creepGroupName: healerCreepGroupName });
}
