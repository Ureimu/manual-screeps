import { getPowerBodyCollection } from "AI/AIUreium/control/getPower/choosePowerBank";
import { CreepBody } from "frame/creep/body";
import { getPowerTaskObject } from "../type";

export const createGetPowerBodyParts: getPowerTaskObject = {
    name: "createGetPowerBodyParts",
    description: "createGetPowerBodyParts",
    start() {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        let lastCollection: { [name: string]: string };

        const powerBankMemory = Memory.rooms[powerBankRoomName].powerBanks?.[powerBankId];
        if (!powerBankMemory) throw new Error("no powerBank Memory");
        if (powerBankMemory.boosted) {
            lastCollection = getPowerBodyCollection["boosted"];
        } else {
            lastCollection = getPowerBodyCollection["normal"];
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
