import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";

export const oMoveToSource: TaskObject<outwardsSourceTaskArgs> = {
    name: "oMoveToSource",
    description: "oMoveToSource",
    start(roomName, sourceRoomName, sourceName) {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const routeName = `${roomName}oBuildSourceContainer${sourceName}`;
        const creepGroupName = `${roomName}h${sourceName}`;
        const sourceFlagName = sourceName;

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: sourceFlagName,
            range: 1,
            doWhenArrive: "goTo"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
