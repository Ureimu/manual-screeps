import { logManager } from "utils/log4screeps";
import { generalCarrier } from "../generalCarrier";

const logger = logManager.createLogger("debug", "carrier");

export function carrier(creep: Creep): void {
    generalCarrier(creep, "carrier");
}
