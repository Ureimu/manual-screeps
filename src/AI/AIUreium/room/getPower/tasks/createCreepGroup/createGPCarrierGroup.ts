import { CreepBody } from "frame/creep/body";
import { bodyTools } from "frame/creep/body/tools";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerProjectName, getPowerTaskArgs } from "../../type";

export const getGPCarrierGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gpc-${powerBankRoomName}-${powerBankId}`;

export const createGPCarrierGroup: TaskObject<getPowerTaskArgs, getPowerTaskArgs> = {
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
        const bodyConfig = CreepBody.getConfig({ creepBodyConfigName: "gpCarrier" })[8];
        if (!bodyConfig) return "end";
        const creepCount = Math.ceil(powerAmount / (bodyTools.getNum(bodyConfig.body, ["carry"]) * CARRY_CAPACITY));
        for (let index = 0; index < creepCount; index++) {
            createNewCreep(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "gpCarrier",
            projectName: getPowerProjectName
        });
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
