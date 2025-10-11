import { Constant } from "AI/AIUreium/mainControl/constants/roomTaskControl";
import { calcGetPowerSpawnTime } from "AI/AIUreium/mainControl/getPower/calcSpawnTime";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../taskRelation";
import { getGPAttackerGroupName } from "./createCreepGroup/createGPAttackerGroup";
import { getGPHealerGroupName } from "./createCreepGroup/createGPHealerGroup";

export const spawnAttackerAndHealer: TaskObject<getPowerTaskArgs> = {
    name: "spawnAttackerAndHealer",
    description: "spawnAttackerAndHealer",
    start(roomName, powerBankRoomName, powerBankId) {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const attackerCreepGroupName = getGPAttackerGroupName(roomName, powerBankRoomName, powerBankId);
        const healerCreepGroupName = getGPHealerGroupName(roomName, powerBankRoomName, powerBankId);
        const args = Memory.creepGroups[attackerCreepGroupName].arguments;
        const passedTime = Game.time - Number(args[3]);
        const index = Number(args[4]);
        const blankSpaceCount = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId]?.blankSpaceCount;
        if (blankSpaceCount === undefined) return "end";
        const nextTime = calcGetPowerSpawnTime(blankSpaceCount, index);
        if (nextTime > passedTime) {
            return "running";
        }
        console.log(`passedTime:${nextTime}, create ${attackerCreepGroupName}`);
        createNewCreep(room, attackerCreepGroupName, healerCreepGroupName, index);
        args[4] = `${index + 1}`;
        if (index + 1 < Constant.getPower.spawnAttackerCount) return "running";
        else return "end";
    },
    justFinished() {
        return "end";
    }
};

function createNewCreep(room: Room, attackerCreepGroupName: string, healerCreepGroupName: string, index: number) {
    const attackerCreepName = `${attackerCreepGroupName}-${index}`;
    SpawnPool.addCreep({
        creepName: attackerCreepName,
        creepBody: "gpAttacker",
        priority: `${5 - index * 0.1}`,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "gpWorker"
    });
    CreepGroup.addCreep({ creepName: attackerCreepName, creepGroupName: attackerCreepGroupName });

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
