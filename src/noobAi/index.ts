import { maintainRoom } from "./room";
import { tower } from "../AIUreium/structure/tower";
import { setBodyConfig } from "./utils/setBodyConfig";

export function runAi(): void {
    if (!Memory.creepBodyConfig.overalls) {
        setBodyConfig("overalls", ["m2w1c1", "m2w1c1*2"]);
    }
    _.forEach(Game.rooms, room => {
        tower.run(room);
    });

    if (Game.time % 5 === 0) maintainRoom();
}
