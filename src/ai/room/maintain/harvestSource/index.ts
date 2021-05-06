import { createCreepGroup } from "ai/utils/createCreepGroup";
import { createCreepNameList } from "ai/utils/createCreepNameList";
import { createRoute } from "ai/utils/createRoute";
import { setBodyConfig } from "ai/utils/setBodyConfig";
import { creepGroupCommit } from "creep/group/commit";
import { createFlagList, getFlagList } from "posMaintainer/maintainer";
import { PosStr } from "utils/RoomPositionToStr";
const name = "harvestSourceStagePlan";
export const harvestSourceStagePlan = [
    {
        name,
        run: (room: Room) => {
            if (!Memory.creepBodyConfig.harvestSource) {
                setBodyConfig("harvestSource", ["m1w2c1", "m1w2*2c1", "m1w2*3c1"]);
            }
            return 1;
        },
        description: `挂载body设置`
    },
    {
        name,
        run: (room: Room) => {
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
                    return 2;
                }
            }
            return 1;
        },
        description: `建造sourceContainer`
    },
    {
        name,
        run: (room: Room) => {
            createFlagList(room, ["container"]);
            const containerFlagList: { [name: string]: Flag } = {};
            const sourceFlagList = getFlagList(room, ["source"]).source;
            const taskName = room.name + "keepOnHarvestingSource";
            const containerList = getFlagList(room, ["container"]).container;
            if (containerList.length > 0) {
                const log: string[] = ["尝试执行" + taskName];
                sourceFlagList.forEach(flagName => {
                    const containerFlag = Game.flags[flagName].pos.findInRange(FIND_FLAGS, 1, {
                        filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
                    })[0];
                    containerFlagList[flagName] = containerFlag;
                });
                if (Object.keys(containerFlagList).length >= 2) {
                    sourceFlagList.forEach(flagName => {
                        log.push(
                            createRoute({
                                routeName: flagName + taskName,
                                ifLoop: "true",
                                midPointList: [
                                    {
                                        pathMidpointPos: containerFlagList[flagName].name,
                                        range: 0,
                                        doWhenArrive: "keepOnHarvestingSource",
                                        actionArgs: PosStr.setPosToStr(Game.flags[flagName].pos)
                                    }
                                ]
                            })
                        );
                        log.push(
                            creepGroupCommit.setCreepGroupProperties({
                                creepGroupName: flagName + "harvest",
                                routeName: flagName + taskName
                            })
                        );
                    });
                    console.log(log.join("\n"));
                    return 3;
                }
            }
            return 2;
        },
        description: `一直挖矿`
    },
    {
        name,
        run: (room: Room) => {
            const a = 1;
            return 3;
        },
        description: `end`
    }
];
