import { canBoostGetPowerCreeps } from "AI/AIUreium/control/getPower/canBoostGetPowerCreeps";
import { CreepBody } from "frame/creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "frame/creep/body/type";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../type";

export const createGetPowerBodyParts: TaskObject<getPowerTaskArgs> = {
    name: "createGetPowerBodyParts",
    description: "createGetPowerBodyParts",
    start() {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const bodyCollection: { [name: string]: string } = {
            gpAttacker: "m20a20",
            gpHealer: "m25h25",
            gpCarrier: "m17c33"
        };

        const boostedBodyCollection: { [name: string]: string } = {
            gpAttacker: "m20a20",
            gpHealer: "m25h25",
            gpCarrier: "m17c33"
        };

        let lastCollection: { [name: string]: string };

        if (canBoostGetPowerCreeps(Game.rooms[roomName], boostedBodyCollection)) {
            lastCollection = boostedBodyCollection;
        } else {
            lastCollection = bodyCollection;
        }
        for (const creepBodyConfigName in lastCollection) {
            const creepBodyConfig = lastCollection[creepBodyConfigName];
            CreepBody.createConfig({ creepBodyConfigName });
            CreepBody.setConfig({
                creepBodyConfigName,
                controllerLevel: "8",
                creepBodyConfig: creepBodyConfig
            });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
