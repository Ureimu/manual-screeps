import { Constant } from "AI/AIUreium/control/constants/roomTaskControl";
import { calcGetPowerSpawnTime } from "AI/AIUreium/control/getPower/calcSpawnTime";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { logManager } from "utils/log4screeps";
import { getPowerTaskObject } from "../type";
import { getGPAttackerGroupName } from "./createCreepGroup/createGPAttackerGroup";
import { getGPHealerGroupName } from "./createCreepGroup/createGPHealerGroup";

const logger = logManager.createLogger("info", "getPower.spawn");

export const spawnAttackerAndHealer: getPowerTaskObject = {
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
        logger.log(`passedTime:${nextTime}, create ${attackerCreepGroupName}`);
        createNewCreep(room, attackerCreepGroupName, healerCreepGroupName, index);
        args[4] = `${index + 1}`;
        if (this.memory.boosted) {
            if (index + 1 < 1) return "running";
        } else {
            if (index + 1 < Constant.getPower.spawnAttackerCount) return "running";
        }
        return "end";
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
