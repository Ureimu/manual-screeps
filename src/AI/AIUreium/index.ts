import { tower } from "./structure/tower";
import { maintainRoom } from "./room/maintain";
import { CreepBody } from "frame/creep/body";
import { manageScoutTask } from "./roles/maintain/scouter";
import { link } from "./structure/link";
import { registerFN } from "utils/profiler";
import { maintainOutwardsSource } from "./room/outwardsSource";
import { terminal } from "./structure/terminal";
import { allocateNewRoom } from "./control/newRoom";
import { maintainNewRoom } from "./room/newRoom";
import { mountUreimuAiAll } from "./mount";
import { observer } from "./structure/observer";
import { runGetPower } from "./room/getPower";
import { powerSpawn } from "./structure/powerSpawn";
export const runAi = registerFN((): void => {
    mountUreimuAiAll();

    if (!Memory.creepBodyConfig?.overalls) {
        CreepBody.createConfig({ creepBodyConfigName: "all" });
        CreepBody.setConfig({ creepBodyConfigName: "all", creepBodyConfig: "m2w1c1", controllerLevel: "1" });
    }

    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            tower.run(room);
            link.run(room);
            terminal.run(room);
            observer.run(room);
            powerSpawn.run(room);
        }
    });

    manageScoutTask();
    if (Game.time % 5 === 0) {
        maintainRoom();
        maintainOutwardsSource();
        maintainNewRoom();
        runGetPower();
    }
    if (Game.time % 150 === 0) {
        allocateNewRoom();
    }
}, "runAi");
