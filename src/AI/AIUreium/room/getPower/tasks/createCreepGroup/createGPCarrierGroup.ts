import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../../type";

export const getGPCarrierGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gpc-${powerBankRoomName}-${powerBankId}`;

export const createGPCarrierGroup: TaskObject<getPowerTaskArgs> = {
    name: "createGPCarrierGroup",
    description: "createGPCarrierGroup",
    start() {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const creepGroupName = getGPCarrierGroupName(roomName, powerBankRoomName, powerBankId);
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${roomName},${powerBankRoomName},${powerBankId}`
        });
        const powerAmount = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId]?.amount;
        if (!powerAmount) return "end";
        const creepCount = Math.ceil(powerAmount / 1250);
        for (let index = 0; index < creepCount; index++) {
            createNewCreep(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "gpCarrier" });
        return "end";
    },
    justFinished() {
        return "end";
    }
};

function createNewCreep(room: Room, creepGroupName: string, index: number) {
    const creepName = `${creepGroupName}-${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "gpCarrier",
        priority: `${4}`,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "gpWorker"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
