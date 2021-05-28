import colorful from "utils/console/colorful";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    if (!global.creepMemory) global.creepMemory = {};
    if (!global.creepMemory[creep.name])
        (global.creepMemory[creep.name] as Partial<typeof global.creepMemory[""]>) = { count: 0, gameTime: Game.time };
    if (!global.creepMemory[creep.name].count) global.creepMemory[creep.name].count = 0;
    if (global.creepMemory[creep.name].gameTime !== Game.time) {
        global.creepMemory[creep.name].gameTime = Game.time;
        global.creepMemory[creep.name].count = 0;
    }
    (global.creepMemory[creep.name].count as number)++;
    if ((global.creepMemory[creep.name].count as number) % 2 === 1) return "moving";
    return "arrived";
}

export const pause: CreepAction = {
    run,
    name: "pause",
    description: "暂停",
    type: "stay"
};
