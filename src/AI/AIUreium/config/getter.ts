import { SCREEPS_CODE_DEST } from "codeConstants";
import { logManager } from "utils/log4screeps";
import { FullConfig } from "./config";
import { defaultRoomConfig, defaultMainConfig } from "./defaultConfig";
import { RoomConfig, MainConfig } from "./type";

const config = FullConfig[SCREEPS_CODE_DEST]?.[Game.shard.name];
export function getRoomConfig(roomName: string): RoomConfig {
    return config?.rooms[roomName] ?? config?.rooms.default ?? defaultRoomConfig;
}

export function getMainConfig(): MainConfig {
    return config?.main ?? defaultMainConfig;
}

const logger = logManager.createLogger("debug", "AISettings");

export function loadSettings() {
    logger.info(`Load ai config from config/${SCREEPS_CODE_DEST}/${Game.shard.name}`);
    if (!config) {
        logger.warn(
            `Load ai config failed. Fallback to default config. You can create your config in config folder. See more details in README.md.`
        );
    }
}
