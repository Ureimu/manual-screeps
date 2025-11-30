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
    working() {
        const bodyCollection: { [name: string]: creepBodyConfigDetail } = {
            gpAttacker: {
                "8": { body: "m20a20" }
            },
            gpHealer: {
                "8": { body: "m25h25" }
            },
            gpCarrier: {
                "8": { body: "m25c25" }
            }
        };

        for (const creepBodyConfigName in bodyCollection) {
            const creepBodyConfig = bodyCollection[creepBodyConfigName];
            CreepBody.createConfig({ creepBodyConfigName });
            for (const level in creepBodyConfig) {
                CreepBody.setConfig({
                    creepBodyConfigName,
                    controllerLevel: level as ControllerLevels,
                    creepBodyConfig: (creepBodyConfig[level as ControllerLevels] as { body: string }).body
                });
            }
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
