import { callOnCreepBirth as creepAction } from "creep/action";

export function callOnBirth(creep: Creep): void {
    if (!global.roomMemory) global.roomMemory = {};
    if (!global.creepMemory) global.creepMemory = {};
    global.creepMemory[creep.name] = {};
    creepAction(creep);
}
