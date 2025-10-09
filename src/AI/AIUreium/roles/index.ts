import { CreepRoleList, registerCreepRole, runCreepByRole } from "frame/creep/action/runCreepByRole";
import { gpAttacker } from "./getPower/gpAttacker";
import { gpCarrier } from "./getPower/gpCarrier";
import { gpHealer } from "./getPower/gpHealer";
import { centerCarrierTask2 } from "./maintain/centerCarrier";
import { scouter } from "./maintain/scouter";
import { claimer1 } from "./newRoom/claimer/claimer1";
import { succor1 } from "./newRoom/succor/succor1";
import { oCarrier1 } from "./outwardsSource/oCarrier";

export function callOnStart(): void {
    if (!global.creepRoleActionList) {
        const creepRoleList: CreepRoleList = {
            scouter,
            centerCarrierTask2,
            oCarrier1,
            claimer1,
            succor1,
            gpAttacker,
            gpHealer,
            gpCarrier
        };
        registerCreepRole(creepRoleList);
    }
}
