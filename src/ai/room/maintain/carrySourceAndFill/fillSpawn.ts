import { createCreepGroup } from "ai/utils/createCreepGroup";
import { createCreepNameList } from "ai/utils/createCreepNameList";
import { createRoute } from "ai/utils/createRoute";
import { RouteMidpointDetail } from "creep/routePlan";
import { createFlagList, getFlagList } from "flagMaintainer/maintainer";

export const fillSpawn = {
    name: "fillSpawn",
    run(room: Room) {
        createFlagList(room, ["container"]);
        const routeName = room.name + "carrySourceAndFill";
        const sourceFlagList = getFlagList(room, ["source"]).source;
        const sourceContainerFlagList: { [name: string]: Flag } = {};
        sourceFlagList.forEach(flagName => {
            const containerFlag = Game.flags[flagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
            })[0];
            if (containerFlag) sourceContainerFlagList[flagName] = containerFlag;
        });
        if (!Memory.routes[routeName] && Object.keys(sourceContainerFlagList).length >= 2) {
            const log: string[] = ["尝试执行" + routeName];
            const midPointList: RouteMidpointDetail[] = [];
            Object.values(sourceContainerFlagList).forEach(flag => {
                midPointList.push({
                    pathMidpointPos: flag.name,
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
            return "fillSpawn";
        }
        return "fillSpawn";
    },
    description: `运输并装满extension和spawn`
};
