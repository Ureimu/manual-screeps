import { MAX_ENERGY_PER_CONTROLLER_LEVEL } from "utils/constants";
import { tryAllocateTargetRoom } from "../control/newRoom/allocateNewRoom";

declare global {
    namespace NodeJS {
        interface Global {
            aiu: {
                tryAllocateTargetRoom: typeof tryAllocateTargetRoom;
                MAX_ENERGY_PER_CONTROLLER_LEVEL: typeof MAX_ENERGY_PER_CONTROLLER_LEVEL;
            };
        }
    }
}

export function mountAIFunction() {
    global.aiu = {
        tryAllocateTargetRoom,
        MAX_ENERGY_PER_CONTROLLER_LEVEL
    };
}
