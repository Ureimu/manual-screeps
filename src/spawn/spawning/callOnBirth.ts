import { callOnCreepBirth as creepAction } from "creep/action";

export function callOnBirth(creep: Creep): void {
    global.creepMemory[creep.name] = {};
    creepAction(creep);
}
