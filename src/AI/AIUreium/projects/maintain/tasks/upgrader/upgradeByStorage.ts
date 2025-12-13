import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../../type";

export const upgradeByStorage: maintainRoomTaskObject = {
    name: "upgradeByStorage",
    description: "upgradeByStorage",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "source", "controller"])
        });

        const routeName = `${room.name}upgradeByStorage`;
        const creepGroupName = `${room.name}up`;
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
            conditionArgs: `${PosStr.setPosToStr(Game.flags[storageFlagName].pos)},${RESOURCE_ENERGY},<=,800`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });

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

        return "end";
    },
    justFinished() {
        return "end";
    }
};
