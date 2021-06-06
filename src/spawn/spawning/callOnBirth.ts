import { callOnCreepBirth as creepAction } from "creep/action";

export function callOnBirth(creep: Creep): void {
    if (!global.roomMemory) global.creepMemory = {};
    if (!global.creepMemory) global.creepMemory = {};
    global.creepMemory[creep.name] = {};
    creepAction(creep);
}
