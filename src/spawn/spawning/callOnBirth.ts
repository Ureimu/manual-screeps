import { callOnCreepBirth as creepAction } from "creep/action";

export function callOnBirth(creep: Creep): void {
    creepAction(creep);
}
