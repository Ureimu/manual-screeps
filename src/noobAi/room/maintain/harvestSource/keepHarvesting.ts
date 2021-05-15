import { createRoute } from "noobAi/utils/createRoute";
import { creepGroup } from "creep/group";
import { createFlagList, getFlagList } from "flagMaintainer/maintainer";
import { PosStr } from "utils/RoomPositionToStr";

export const keepHarvesting = {
    name: "keepHarvesting",
    run(room: Room) {
        createFlagList(room, ["container"]);
        const sourceContainerFlagList: { [name: string]: Flag } = {};
        const sourceFlagList = getFlagList(room, ["source"]).source;
        const taskName = room.name + "keepOnHarvestingSource";
        const containerList = getFlagList(room, ["container"]).container;
        if (containerList.length > 0) {
            const log: string[] = ["尝试执行" + taskName];
            sourceFlagList.forEach(flagName => {
                const containerFlag = Game.flags[flagName].pos.findInRange(FIND_FLAGS, 1, {
                    filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
                })[0];
                if (containerFlag) sourceContainerFlagList[flagName] = containerFlag;
            });
            if (Object.keys(sourceContainerFlagList).length >= 2) {
                sourceFlagList.forEach(flagName => {
                    log.push(
                        createRoute({
                            routeName: flagName + taskName,
                            ifLoop: "true",
                            midPointList: [
                                {
                                    pathMidpointPos: sourceContainerFlagList[flagName].name,
                                    range: 0,
                                    doWhenArrive: "keepOnHarvestingSource",
                                    actionArgs: PosStr.setPosToStr(Game.flags[flagName].pos)
                                }
                            ]
                        })
                    );
                    log.push(
                        creepGroup.setCreepGroupProperties({
                            creepGroupName: flagName + "harvest",
                            routeName: flagName + taskName
                        })
                    );
                });
                console.log(log.join("\n"));
                return "endState";
            }
        }
        return "keepHarvesting";
    },
    description: `一直挖矿`
};
