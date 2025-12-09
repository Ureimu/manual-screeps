import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { outwardsSourceProjectName, outwardsSourceTaskObject } from "../../type";
import { OHarvestGroupCreepName } from "../createCreepGroup/createOHarvestGroup";

export const oMoveToSource: outwardsSourceTaskObject = {
    name: "oMoveToSource",
    description: "oMoveToSource",
    start(roomName, sourceRoomName, sourceName) {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const routeName = `${roomName}oBuildSourceContainer${sourceName}`;
        const creepGroupName = OHarvestGroupCreepName(roomName, sourceName);
        const sourceFlagName = sourceName;

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: sourceFlagName,
            range: 1,
            doWhenArrive: "goTo"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: sourceFlagName,
            range: 50,
            doWhenArrive: "pause"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: outwardsSourceProjectName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
