import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep, args?: string[]): state {
    const source = getMidpointObjects(creep, LOOK_SOURCES)[0];
    const ifHarvesting = creep.store.getFreeCapacity() !== 0;
    if (!args) {
        if (ifHarvesting) {
            if (Game.time % 20 === 0) {
                creep.moveTo(source, { range: 1 });
            }
            creep.harvest(source);
            return "arrived";
        } else {
            return "moving";
        }
    } else {
        const [standByPosStr, ifKeepHarvest] = args;
        if (ifKeepHarvest === "true" || ifHarvesting) {
            if (Game.time % 10 === 0) {
                const standByPos = PosStr.getPosFromStr(standByPosStr);
                if (!creep.pos.isEqualTo(standByPos)) {
                    creep.moveTo(standByPos, { range: 0 });
                }
            }
            creep.harvest(source);
        }
        if (ifHarvesting) {
            return "arrived";
        } else {
            return "moving";
        }
    }
}

export const harvestSource: CreepAction = {
    run,
    name: "harvestSource",
    description: "挖能量矿",
    type: "stay"
};
