import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "version");

export function versionCheck(): void {
    if (Memory.version) {
        switch (Memory.version) {
            case "0.1.1":
            case "0.1.2":
            default:
                break;
        }
    } else {
        Memory.version = global.version;
    }
    logger.log(`${Memory.version}`);
}
