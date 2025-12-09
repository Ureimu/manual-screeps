import { CreepBody } from "frame/creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "frame/creep/body/type";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../type";

export const createOBodyParts: TaskObject<outwardsSourceTaskArgs, outwardsSourceTaskArgs> = {
    name: "createOBodyParts",
    description: "createOBodyParts",
    start() {
        return "end";
    },
    working() {
        const bodyCollection: { [name: string]: creepBodyConfigDetail } = {
            oHarvester: {
                "1": { body: "w2c1m1" },
                "2": { body: "w4c1m1" },
                "3": { body: "w6c1m1" },
                "5": { body: "w8c1m2" }
            },
            oBuilder: {
                "1": { body: "w1c1m1" },
                "4": { body: "w3c4m4" },
                "5": { body: "w4c4m4" },
                "6": { body: "w7c7m7" },
                "7": { body: "w10c10m10" }
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
