import { callOnCreepBirth as creepAction } from "frame/creep/action";

export const callOnCreepBirthFuncList: ((creep: Creep) => void)[] = [creepAction];

export function callOnBirth(creep: Creep): void {
    if (!global.roomMemory) global.roomMemory = {};
    if (!global.creepMemory) global.creepMemory = {};
    global.creepMemory[creep.name] = {};
    callOnCreepBirthFuncList.forEach(func => func(creep));
}
