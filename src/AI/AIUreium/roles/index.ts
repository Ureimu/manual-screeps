import { CreepRoleList, registerCreepRole, runCreepByRole } from "frame/creep/action/runCreepByRole";
import { scouter } from "./maintain/scouter";

export function callOnStart(): void {
    if (!global.creepRoleActionList) {
        const creepRoleList: CreepRoleList = {
            scouter
        };
        registerCreepRole(creepRoleList);
    }
}
