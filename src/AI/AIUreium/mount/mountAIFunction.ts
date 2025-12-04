import { MAX_ENERGY_PER_CONTROLLER_LEVEL } from "utils/constants";
import { tryAllocateTargetRoom } from "../control/newRoom/allocateNewRoom";
import { abandonRoom } from "../control/room/stop";

declare global {
    namespace NodeJS {
        interface Global {
            aiu: {
                tryAllocateTargetRoom: typeof tryAllocateTargetRoom;
                MAX_ENERGY_PER_CONTROLLER_LEVEL: typeof MAX_ENERGY_PER_CONTROLLER_LEVEL;
                abandonRoom: typeof abandonRoom;
            };
        }
    }
}

export function mountAIFunction() {
    global.aiu = {
        tryAllocateTargetRoom,
        MAX_ENERGY_PER_CONTROLLER_LEVEL,
        abandonRoom
    };
}
