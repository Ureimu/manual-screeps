import { createCreepGroup } from "noobAi/utils/createCreepGroup";
import { createCreepNameList } from "noobAi/utils/createCreepNameList";
import { createRoute } from "noobAi/utils/createRoute";
import { RouteMidpointDetail } from "creep/routePlan/type";
import { createFlagList, getFlagList } from "flagMaintainer/maintainer";

export const upgradeController = {
    name: "upgradeController",
    run(room: Room) {
        createFlagList(room, ["container", "controller"]);
        const routeName = room.name + "upgradeController";
        const sourceContainerFlagList = getFlagList(room, ["container"]).container;
        const controllerFlagList = getFlagList(room, ["controller"]).controller;
        if (!Memory.routes[routeName]) {
            const log: string[] = ["尝试执行" + routeName];
            const midPointList: RouteMidpointDetail[] = [];
            sourceContainerFlagList.forEach(flagName => {
                midPointList.push({
                    pathMidpointPos: flagName,
                    range: 1,
                    doWhenArrive: "withdrawEnergy",
                    actionArgs: "false"
                });
            });
            midPointList.push({
                pathMidpointPos: controllerFlagList[0],
                range: 3,
                doWhenArrive: "build"
            });
            midPointList.push({
                pathMidpointPos: controllerFlagList[0],
                range: 3,
                doWhenArrive: "upgradeController"
            });
            log.push(
                createRoute({
                    routeName,
                    ifLoop: "true",
                    midPointList
                })
            );
            const creepNameList = createCreepNameList(12, index => `${room.name}u${index}`);
            log.push(
                createCreepGroup({
                    creepBody: "upgradeController",
                    priority: "9",
                    roomName: room.name,
                    readyCondition: "loop",
                    creepGroupName: "upgradeController",
                    creepNameList,
                    routeName
                })
            );
            console.log(log.join("\n"));
            return "upgradeController";
        }
        return "upgradeController";
    },
    description: `升级controller`
};
