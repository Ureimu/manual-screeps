import { CreepBody } from "frame/creep/body";
import { ControllerLevels, creepBodyConfigDetail } from "frame/creep/body/type";
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
            upgrader: {
                "1": { body: "m2w1c1" },
                "2": { body: "m1w1c1*2" },
                "3": { body: "m1w1c1*4" },
                "4": { body: "m1w1c1*6" },
                "5": { body: "m1w1c1*7" },
                "7": { body: "m5w20c8" },
                "8": { body: "m4w15c8" }
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
                "5": { body: "m10c20" },
                "8": { body: "m16c32" }
            },
            scouter: {
                "1": { body: "m1" }
            },
            centerCarrier: {
                "1": { body: "m1c5" },
                "4": { body: "m2c16" }
            },
            miner: {
                "5": { body: "m3w12" }
            },
            levelKeeper: {
                "1": { body: "m2w1c2" },
                "2": { body: "m5w1c4" }
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
