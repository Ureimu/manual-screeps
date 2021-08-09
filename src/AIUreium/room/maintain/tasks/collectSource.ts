import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomTaskArgs } from "../taskRelation";

export const collectSource: TaskObject<maintainRoomTaskArgs> = {
    name: "collectSource",
    description: "collectSource",
    start(roomName) {
        const room = Game.rooms[roomName];
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
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
