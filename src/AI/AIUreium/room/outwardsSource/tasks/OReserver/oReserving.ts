import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
import { OReserveGroupCreepName } from "../createCreepGroup/createOReserveGroup";

export const oReserving: TaskObject<outwardsSourceTaskArgs> = {
    name: "oReserving",
    description: "oReserving",
    start(roomName, sourceRoomName, sourceName) {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const routeName = `${roomName}oReserving${sourceName}`;
        const creepGroupName = OReserveGroupCreepName(roomName, sourceName);
        FlagMaintainer.refresh({ roomName: sourceRoomName, typeList: FlagMaintainer.getTypeList(["controller"]) });
        const controllerFlagName = FlagTools.getName(sourceRoomName, "controller", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 1,
            doWhenArrive: "goTo"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 1,
            doWhenArrive: "reserveController"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
