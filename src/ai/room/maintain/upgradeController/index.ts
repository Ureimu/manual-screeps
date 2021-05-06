import { createCreepGroup } from "ai/utils/createCreepGroup";
import { createCreepNameList } from "ai/utils/createCreepNameList";
import { createRoute } from "ai/utils/createRoute";
import { setBodyConfig } from "ai/utils/setBodyConfig";
import { RouteMidpointDetail } from "creep/routePlan";
import { createFlagList, getFlagList } from "posMaintainer/maintainer";
const name = "upgradeControllerStagePlan";
export const upgradeControllerStagePlan = [
    {
        name,
        run: (room: Room) => {
            if (!Memory.creepBodyConfig["upgradeController"]) {
                setBodyConfig("upgradeController", ["m2w1c1*1", "m2w1c1*2", "m2w1c1*3"]);
            }
            return 1;
        },
        description: `挂载body设置`
    },
    {
        name,
        run: (room: Room) => {
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
                        routeName: routeName,
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
                        routeName: routeName
                    })
                );
                console.log(log.join("\n"));
                return 2;
            }
            return 1;
        },
        description: `升级controller`
    },
    {
        name,
        run: (room: Room) => {
            return 2;
        },
        description: `end`
    }
];
