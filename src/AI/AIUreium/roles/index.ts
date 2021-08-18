import { CreepRoleList, registerCreepRole, runCreepByRole } from "frame/creep/action/runCreepByRole";
import { centerCarrierTask2 } from "./maintain/centerCarrier";
import { scouter } from "./maintain/scouter";

export function callOnStart(): void {
    if (!global.creepRoleActionList) {
        const creepRoleList: CreepRoleList = {
            scouter,
            centerCarrierTask2
        };
        registerCreepRole(creepRoleList);
    }
}
