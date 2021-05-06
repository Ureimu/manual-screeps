import { createCreepGroup } from "ai/utils/createCreepGroup";
import { createCreepNameList } from "ai/utils/createCreepNameList";
import { createRoute } from "ai/utils/createRoute";
import { setBodyConfig } from "ai/utils/setBodyConfig";
import { RouteMidpointDetail } from "creep/routePlan";
import { createFlagList, getFlagList } from "posMaintainer/maintainer";
const name = "carrySourceAndFillStagePlan";
export const carrySourceAndFillStagePlan = [
    {
        name,
        run: (room: Room) => {
            if (!Memory.creepBodyConfig["carrySource"]) {
                setBodyConfig("carrySource", ["m1c1*3", "m1c1*6", "m1c1*9"]);
            }
            return 1;
        },
        description: `挂载body设置`
    },
    {
        name,
        run: (room: Room) => {
            createFlagList(room, ["container"]);
            const routeName = room.name + "carrySourceAndFill";
            const sourceContainerFlagList = getFlagList(room, ["container"]).container;
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
                    pathMidpointPos: midPointList[midPointList.length - 1].pathMidpointPos,
                    range: 1,
                    doWhenArrive: "fillSpawnAndExtension"
                });
                log.push(
                    createRoute({
                        routeName: routeName,
                        ifLoop: "true",
                        midPointList
                    })
                );
                const creepNameList = createCreepNameList(2, index => `${room.name}cf${index}`);
                log.push(
                    createCreepGroup({
                        creepBody: "carrySource",
                        priority: "11",
                        roomName: room.name,
                        readyCondition: "loop",
                        creepGroupName: "carrySourceAndFill",
                        creepNameList,
                        routeName: routeName
                    })
                );
                console.log(log.join("\n"));
                return 2;
            }
            return 1;
        },
        description: `运输并装满extension和spawn`
    },
    {
        name,
        run: (room: Room) => {
            const a = 1;
            return 2;
        },
        description: `end`
    }
];
