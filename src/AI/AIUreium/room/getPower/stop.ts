import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { logManager } from "utils/log4screeps";
import { getPowerTaskArgs } from "./taskRelation";
import { getGPAttackerGroupName } from "./tasks/createCreepGroup/createGPAttackerGroup";
import { getGPCarrierGroupName } from "./tasks/createCreepGroup/createGPCarrierGroup";
import { getGPHealerGroupName } from "./tasks/createCreepGroup/createGPHealerGroup";

const logger = logManager.createLogger("debug", "stopGetPower");
export function stopGetPower(...args: getPowerTaskArgs): void {
    const [originRoomName, powerBankRoomName, powerBankId] = args;

    const room = Game.rooms[originRoomName];
    if (!room.memory.status) {
        room.memory.status = {};
    }
    const status = room.memory.status;
    status.getPower = false;

    const creepGroupNameList = [
        getGPAttackerGroupName(...args),
        getGPCarrierGroupName(...args),
        getGPHealerGroupName(...args)
    ];

    creepGroupNameList.forEach(creepGroupName => {
        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.deleteCreep({ creepName, roomName: originRoomName });
            if (Game.creeps[creepName]) {
                Game.creeps[creepName].suicide();
            }
        });
        CreepGroup.deleteCreepGroup({ creepGroupName });
    });

    delete Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId];
    logger.debug(
        `deleted memory length for now: ${
            JSON.stringify(Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId]).length
        }`
    );
}
