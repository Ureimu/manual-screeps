import { onLabTaskEnd } from ".";

const boostInfo: {
    [name: string]: string;
} = {};

export function getBoost(creep: Creep): boolean {
    if (!creep.memory.boostLabTaskNameList || creep.memory.boostLabTaskNameList.length === 0) {
        return true;
    }

    const taskNameList = creep.memory.boostLabTaskNameList;
    const room = creep.room;

    if (!boostInfo[creep.name]) {
        const carryEndTaskName = taskNameList.find(taskName => {
            const labTask = room.memory.AIUreium.labTaskPool[taskName];
            return labTask.isCarryEnd;
        });
        if (carryEndTaskName) {
            boostInfo[creep.name] = carryEndTaskName;
        } else {
            return false;
        }
    }
    if (boostInfo[creep.name]) {
        const carryEndTaskName = boostInfo[creep.name];
        const task = room.memory.AIUreium.labTaskPool[carryEndTaskName];
        if (!task) {
            delete boostInfo[creep.name];
            return false;
        }
        if (task.type !== "boostCreep") return false;
        const lab = Game.getObjectById(task.labList[0]);
        if (!lab) return false;

        if (!creep.pos.isNearTo(lab)) {
            creep.moveTo(lab, { range: 1 });
        } else {
            if (lab.store.energy < task.bodyPartsCount * LAB_BOOST_ENERGY) {
                return false;
            }
            const returnCode = lab.boostCreep(creep);
            if (returnCode === OK) {
                onLabTaskEnd(room.name, task.name);
            }
        }
    }
    return false;
}
