import { CreepRoleList, registerCreepRole, runCreepByRole } from "creep/action/runCreepByRole";
import { scouter } from "./maintain/scouter";

export function callOnStart(): void {
    if (!global.creepRoleActionList) {
        const creepRoleList: CreepRoleList = {
            scouter
        };
        registerCreepRole(creepRoleList);
    }
}
