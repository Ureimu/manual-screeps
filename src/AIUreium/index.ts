import { tower } from "./structure/tower";
import { maintainRoom } from "./room/maintain";
import { creepBody } from "creep/body";

export function runAi(): void {
    if (!Memory.creepBodyConfig.overalls) {
        creepBody.createConfig({ creepBodyConfigName: "all" });
        creepBody.setConfig({ creepBodyConfigName: "all", creepBodyConfig: "m2w1c1", controllerLevel: "1" });
    }
    _.forEach(Game.rooms, room => {
        tower.run(room.name);
    });

    if (Game.time % 5 === 0) maintainRoom();
}
