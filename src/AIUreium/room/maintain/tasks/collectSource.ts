import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { PosStr } from "utils/RoomPositionToStr";
import { RoomTaskArgs } from "../taskRelation";

export const collectSource: TaskObject<RoomTaskArgs> = {
    name: "collectSource",
    description: "collectSource",
    start(room) {
        return "end";
    },
    working(room) {
        const routeName = `${room.name}collectSource`;
        const creepGroupName = `${room.name}col`;
        const controllerFlagName = FlagTools.getName(room.name, "controller", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 50,
            doWhenArrive: "keepOnHarvestingSource"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
