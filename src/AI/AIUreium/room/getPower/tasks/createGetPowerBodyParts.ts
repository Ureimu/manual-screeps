import { canBoostGetPowerCreeps } from "AI/AIUreium/control/getPower/canBoostGetPowerCreeps";
import { CreepBody } from "frame/creep/body";
import { getPowerTaskObject } from "../type";

export const createGetPowerBodyParts: getPowerTaskObject = {
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
            gpAttacker: "t5m25a20 t5b2 a20b2",
            gpHealer: "m19h19 h19b2",
            gpCarrier: "m17c33"
        };

        let lastCollection: { [name: string]: string };

        if (typeof this.memory.boosted !== "boolean") {
            this.memory.boosted = canBoostGetPowerCreeps(Game.rooms[roomName], boostedBodyCollection);
        }

        if (this.memory.boosted) {
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
