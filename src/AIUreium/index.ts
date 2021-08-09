import { tower } from "./structure/tower";
import { maintainRoom } from "./room/maintain";
import { CreepBody } from "creep/body";
import { manageScoutTask } from "./roles/maintain/scouter";
import { link } from "./structure/link";
import { registerFN } from "profiler";
import { maintainOutwardsSource } from "./room/outwardsSource";
export const runAi = registerFN((): void => {
    if (!Memory.creepBodyConfig.overalls) {
        CreepBody.createConfig({ creepBodyConfigName: "all" });
        CreepBody.setConfig({ creepBodyConfigName: "all", creepBodyConfig: "m2w1c1", controllerLevel: "1" });
    }

    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            tower.run(room);
            link.run(room);
        }
    });

    manageScoutTask();
    if (Game.time % 5 === 0) {
        maintainRoom();
        maintainOutwardsSource();
    }
}, "runAi");
