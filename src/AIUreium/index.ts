import { tower } from "./structure/tower";
import { maintainRoom } from "./room/maintain";
import { CreepBody } from "creep/body";
import { manageScoutTask } from "./roles/maintain/scouter";

export function runAi(): void {
    if (!Memory.creepBodyConfig.overalls) {
        CreepBody.createConfig({ creepBodyConfigName: "all" });
        CreepBody.setConfig({ creepBodyConfigName: "all", creepBodyConfig: "m2w1c1", controllerLevel: "1" });
    }
    _.forEach(Game.rooms, room => {
        tower.run(room.name);
    });
    manageScoutTask();
    if (Game.time % 5 === 0) maintainRoom();
}
