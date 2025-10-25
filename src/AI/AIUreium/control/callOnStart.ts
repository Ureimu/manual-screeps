import { SCREEPS_CODE_DEST } from "codeConstants";
import { logManager } from "utils/log4screeps";
import { FullControlSetting } from "./settings";
import { defaultRoomControlData } from "./type";

const logger = logManager.createLogger("debug", "AIControl");

export function callOnStart() {
    logger.info(`load ai config from ControlSetting/${SCREEPS_CODE_DEST}/${Game.shard.name}`);
    const controlData = FullControlSetting[SCREEPS_CODE_DEST]?.[Game.shard.name];
    if (!global.roomMemory) global.roomMemory = {};
    _.forEach(Game.rooms, room => {
        if (!room.controller) return;
        if (!room.controller.my) return;
        if (!global.roomMemory[room.name]) global.roomMemory[room.name] = {};
        global.roomMemory[room.name].control = controlData?.[room.name] ?? defaultRoomControlData;
    });
}
