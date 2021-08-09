import { CreepBody } from "creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "creep/body/type";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../taskRelation";

export const createDefaultBodyparts: TaskObject<maintainRoomTaskArgs> = {
    name: "createDefaultBodyparts",
    description: "createDefaultBodyparts",
    start() {
        return "end";
    },
    working() {
        const bodyCollection: { [name: string]: creepBodyConfigDetail } = {
            worker: {
                "1": { body: "m2w1c1" },
                "2": { body: "m1w1c1*2" },
                "3": { body: "m1w1c1*4" },
                "4": { body: "m1w1c1*6" },
                "5": { body: "m1w1c1*7" }
            },
            harvester: {
                "1": { body: "w2c1m1" },
                "2": { body: "w4c1m1" },
                "3": { body: "w6c1m1" },
                "5": { body: "w8c4m2" }
            },
            carrier: {
                "1": { body: "m3c3" },
                "2": { body: "m3c6" },
                "3": { body: "m5c10" },
                "4": { body: "m8c16" },
                "5": { body: "m10c20" }
            },
            scouter: {
                "1": { body: "m1" }
            },
            centerCarrier: {
                "4": { body: "m2c16" }
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
