import { createCreepGroup } from "ai/utils/createCreepGroup";
import { createCreepNameList } from "ai/utils/createCreepNameList";
import { createRoute } from "ai/utils/createRoute";
import { createFlagList, getFlagList } from "flagMaintainer/maintainer";

export const buildSourceContainer = {
    name: "buildSourceContainer",
    run(room: Room) {
        createFlagList(room, ["containerConstructionSite", "source", "container"]);
        const containerConstructionSiteFlagList: { [name: string]: Flag } = {};
        const taskName = "HarvestSourceAndBuildContainer";
        const siteList = getFlagList(room, ["containerConstructionSite"]).containerConstructionSite;
        //console.log(siteList);
        const sourceFlagList = getFlagList(room, ["source"]).source;
        if (siteList.length > 0) {
            const log: string[] = [room.name + "尝试执行" + taskName];
            sourceFlagList.forEach(flagName => {
                const containerConstructionSiteFlag = Game.flags[flagName].pos.findInRange(FIND_FLAGS, 1, {
                    filter: i => i.name.indexOf("containerConstructionSite") !== -1
                })[0];
                containerConstructionSiteFlagList[flagName] = containerConstructionSiteFlag;
            });
            if (Object.keys(containerConstructionSiteFlagList).length >= 2) {
                sourceFlagList.forEach(flagName => {
                    log.push(
                        createRoute({
                            routeName: flagName + taskName,
                            ifLoop: "true",
                            midPointList: [
                                {
                                    pathMidpointPos: flagName,
                                    range: 1,
                                    doWhenArrive: "harvestSource"
                                },
                                {
                                    pathMidpointPos: containerConstructionSiteFlagList[flagName].name,
                                    range: 1,
                                    doWhenArrive: "build"
                                }
                            ]
                        })
                    );
                    const creepNameList = createCreepNameList(1, index => `${room.name}${flagName}h${index}`);
                    log.push(
                        createCreepGroup({
                            creepBody: "harvestSource",
                            priority: "10",
                            roomName: room.name,
                            readyCondition: "loop",
                            creepGroupName: flagName + "harvest",
                            creepNameList,
                            routeName: flagName + taskName
                        })
                    );
                });
                console.log(log.join("\n"));
                return "keepHarvesting";
            }
        }
        return "buildSourceContainer";
    },
    description: `建造sourceContainer`
};
