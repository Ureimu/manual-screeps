import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const fillSpawn: TaskObject<RoomTaskArgs> = {
    name: "fillSpawn",
    description: "fillSpawn",
    start(room) {
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage"])
        });
        return "end";
    },
    working(room) {
        const routeName = `${room.name}fillSpawn`;
        const creepGroupName = `${room.name}fs`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "fillSpawnAndExtension"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `empty`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "fillTower"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "pause"
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
