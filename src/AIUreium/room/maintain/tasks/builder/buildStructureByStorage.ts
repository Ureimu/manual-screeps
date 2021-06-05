import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { TaskObject } from "utils/ProjectRunner";
import { PosStr } from "utils/RoomPositionToStr";
import { RoomTaskArgs } from "../../taskRelation";

export const buildStructureByStorage: TaskObject<RoomTaskArgs> = {
    name: "buildStructureByStorage",
    description: "buildStructureByStorage",
    start(room) {
        if (Game.time % 5 === 0) {
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
            });
        }
        if (room.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(room) {
        const sources = room.find(FIND_SOURCES);
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "source", "controller"])
        });

        const routeName = `${room.name}buildStructureByStorage`;
        const creepGroupName = `${room.name}build`;
        const controllerFlagName = FlagTools.getName(room.name, "controller", 0);
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });

        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 3,
            conditionArgs: `full`
        });
        RoutePlan.addCondition({
            routeName,
            condition: "store",
            jumpTo: 2,
            conditionArgs: `${PosStr.setPosToStr(Game.flags[storageFlagName].pos)},${RESOURCE_ENERGY},>=,1e4`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "stayByRoad"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "store",
            jumpTo: 2,
            conditionArgs: `${PosStr.setPosToStr(Game.flags[storageFlagName].pos)},${RESOURCE_ENERGY},<=,1e4`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 50,
            doWhenArrive: "build"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `empty`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 50,
            doWhenArrive: "repair"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `empty`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 3,
            doWhenArrive: "upgradeController"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 50,
            doWhenArrive: "pause"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });
        return "end";
    },
    justFinished() {
        return "end";
    }
};
