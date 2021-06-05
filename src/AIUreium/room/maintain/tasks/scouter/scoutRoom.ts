import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../../taskRelation";

export const scoutRoom: TaskObject<RoomTaskArgs> = {
    name: "scoutRoom",
    description: "scoutRoom",
    start() {
        return "end";
    },
    working(room) {
        const routeName = `${room.name}scoutRoom`;
        const creepGroupName = `${room.name}s`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);
        RoutePlan.create({ routeName, ifLoop: "true" });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: 
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
