import { CreepBody } from "creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "creep/body/type";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const createDefaultBodyparts: TaskObject<RoomTaskArgs> = {
    name: "createDefaultBodyparts",
    description: "createDefaultBodyparts",
    start() {
        return "end";
    },
    working() {
        const bodyCollection: { [name: string]: creepBodyConfigDetail } = {
            worker: {
                "1": { body: "m2w1c1" }
            },
            harvester: {
                "1": { body: "m1w1*1c1m1" },
                "2": { body: "m1w1*3c1m1" },
                "3": { body: "m1w1*4c1m1" },
                "4": { body: "m1w1*5c1m1" }
            },
            carrier: {
                "1": { body: "m1c1*3" },
                "2": { body: "m1c1*5" },
                "3": { body: "m1c1*7" },
                "4": { body: "m1c1*9" }
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
