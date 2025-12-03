import { tryAllocateTargetRoom } from "../control/newRoom/allocateNewRoom";

declare global {
    namespace NodeJS {
        interface Global {
            aiu: {
                tryAllocateTargetRoom: typeof tryAllocateTargetRoom;
            };
        }
    }
}

export function mountAIFunction() {
    global.aiu = {
        tryAllocateTargetRoom
    };
}
