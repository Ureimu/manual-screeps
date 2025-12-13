import { MainControlData, RoomControlData } from "./type";
import { SCREEPS_CODE_DEST } from "codeConstants";
import { logManager } from "utils/log4screeps";
import { defaultMainControlData, defaultRoomControlData } from "./defaultSetting";
import { FullControlSetting } from "./settings";

export function getRoomControlData(roomName: string): RoomControlData {
    return global.roomMemory[roomName]?.control ?? defaultRoomControlData;
}

export function getMainControlData(): MainControlData {
    return global.mainControlData;
}

const logger = logManager.createLogger("debug", "AIControl");

export function loadSettings() {
    logger.info(`load ai config from ControlSetting/${SCREEPS_CODE_DEST}/${Game.shard.name}`);
    const controlData = FullControlSetting[SCREEPS_CODE_DEST]?.[Game.shard.name];
    if (!global.roomMemory) global.roomMemory = {};
    global.mainControlData = controlData?.main ?? defaultMainControlData;
    if (controlData) {
        _.forEach(controlData.rooms, (room, roomName) => {
            if (!roomName) return;
            if (!global.roomMemory[roomName]) global.roomMemory[roomName] = {};
            global.roomMemory[roomName].control = controlData?.rooms[roomName] ?? defaultRoomControlData;
            global.roomMemory[roomName].status = {};
        });
    }
}
