import { bodyTools } from "frame/creep/body/tools";
import { callOnCreepBirthFuncList } from "frame/spawn/spawning/callOnBirth";
import { addLabTask } from "../runLab";

callOnCreepBirthFuncList.push(sendBoostTask);
function sendBoostTask(creep: Creep) {
    const creepBody = Memory.rooms[creep.room.name].spawnPool[creep.name].creepBody;
    const boostInfo = bodyTools.parseBoostInfo(creepBody);
    if (_.isEmpty(boostInfo.byCompound)) {
        return;
    }

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
    });
}
