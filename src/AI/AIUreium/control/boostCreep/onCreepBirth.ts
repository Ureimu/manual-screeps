import { bodyTools } from "frame/creep/body/tools";
import { callOnCreepBirthFuncList } from "frame/spawn/spawning/callOnBirth";
import { addCarryTask } from "../roomCarry";

callOnCreepBirthFuncList.push(sendBoostTask);

function sendBoostTask(creep: Creep) {
    const creepBody = Memory.rooms[creep.room.name].spawnPool[creep.name].creepBody;
    const boostInfo = bodyTools.parseBoostInfo(creepBody);
    if (_.isEmpty(boostInfo.byPart)) {
        return;
    }
    if (!creep.room.storage) return;

    // 检查是否有空闲lab，直到有空闲lab了，再预定lab，添加carryTask。
    const taskName = `boostCreep-${creep.name}`;
    addCarryTask(creep.room.name, "carrier", {
        name: taskName,
        from: [creep.room.storage.id],
        to: [],
        resources: [RESOURCE_ENERGY, RESOURCE_POWER],
        priority: 6,
        amounts: []
    });
}
