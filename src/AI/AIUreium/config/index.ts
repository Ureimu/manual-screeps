import { MainConfig, RoomConfig } from "./type";
import { SCREEPS_CODE_DEST } from "codeConstants";
import { logManager } from "utils/log4screeps";
import { defaultMainControlData, defaultRoomConfig } from "./defaultConfig";
import { FullConfig } from "./config";

export function getRoomConfig(roomName: string): RoomConfig {
    return global.roomMemory[roomName]?.control ?? defaultRoomConfig;
}

export function getMainConfig(): MainConfig {
    return global.mainControlData;
}

const logger = logManager.createLogger("debug", "AISettings");

export function loadSettings() {
    logger.info(`load ai config from config/${SCREEPS_CODE_DEST}/${Game.shard.name}`);
    const controlData = FullConfig[SCREEPS_CODE_DEST]?.[Game.shard.name];
    if (!global.roomMemory) global.roomMemory = {};
    global.mainControlData = controlData?.main ?? defaultMainControlData;
    if (controlData) {
        _.forEach(controlData.rooms, (room, roomName) => {
            if (!roomName) return;
            if (!global.roomMemory[roomName]) global.roomMemory[roomName] = {};
            global.roomMemory[roomName].control = controlData?.rooms[roomName] ?? defaultRoomConfig;
            global.roomMemory[roomName].status = {};
        });
    }
}
