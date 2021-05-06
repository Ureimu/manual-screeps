import { maintainRoom } from "./room";
import { setBodyConfig } from "./utils/setBodyConfig";

export function runAi(): void {
    if (!Memory.creepBodyConfig.overalls) {
        setBodyConfig("overalls", ["m2w1c1", "m2w1c1*2"]);
    }
    if (Game.time % 5 === 0) maintainRoom();
}
