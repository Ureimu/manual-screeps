import { CreepBody } from "creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "creep/body/type";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../taskRelation";

export const createOBodyParts: TaskObject<outwardsSourceTaskArgs> = {
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
