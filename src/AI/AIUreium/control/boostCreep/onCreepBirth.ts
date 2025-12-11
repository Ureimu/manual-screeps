import { bodyTools } from "frame/creep/body/tools";
import { logManager } from "utils/log4screeps";
import { addLabTask } from "../runLab";

const logger = logManager.createLogger("debug", "onCreepBirth.sendBoostTask");

export function sendBoostTask(creep: Creep) {
    // logger.debug(`${creep.name} sendBoostTask`);
    const creepBody = Memory.rooms[creep.room.name].spawnPool[creep.name].creepBody;
    const boostInfo = bodyTools.parseBoostInfo(creepBody);
    if (_.isEmpty(boostInfo.byCompound)) {
        return;
    }

    logger.debug(`${creep.name} try add boost task`);
    if (!creep.room.storage) return;
    if (!creep.memory.boostLabTaskNameList) {
        creep.memory.boostLabTaskNameList = [];
    }
    _.forEach(boostInfo.byCompound, (amount: number, compoundName: string | undefined) => {
        if (!compoundName) {
            return;
        }
        const boostCompoundName = compoundName as MineralBoostConstant;
        const taskName = `boostCreep-${creep.id}-${boostCompoundName}`;

        addLabTask(creep.room.name, {
            name: taskName,
            type: "boostCreep",
            priority: 6,
            creepId: creep.id,
            boostType: boostCompoundName,
            bodyPartsCount: amount
        });
        creep.memory.boostLabTaskNameList.push(taskName);
        logger.debug(`${creep.name} add boost lab task ${taskName}`);
    });
}
