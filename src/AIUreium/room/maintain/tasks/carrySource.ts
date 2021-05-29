import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { TaskObject } from "utils/ProjectRunner";
import { PosStr } from "utils/RoomPositionToStr";
import { RoomTaskArgs } from "../taskRelation";

export const carrySource: TaskObject<RoomTaskArgs> = {
    name: "carrySource",
    description: "carrySource",
    start(room) {
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "container"])
        });
        return "end";
    },
    working(room) {
        const sources = room.find(FIND_SOURCES);

        const routeName = `${room.name}carrySource`;
        const creepGroupName = `${room.name}c`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });
        for (let index = 0; index < sources.length; index++) {
            const sourceFlagName = FlagTools.getName(room.name, "source", index);
            const containerFlagName = Game.flags[sourceFlagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
            })[0].name;
            RoutePlan.addCondition({
                routeName,
                condition: "creepStore",
                jumpTo: 3,
                conditionArgs: `full`
            });
            RoutePlan.addCondition({
                routeName,
                condition: "store",
                jumpTo: 2,
                conditionArgs: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)},${RESOURCE_ENERGY},<=,500`
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: containerFlagName,
                range: 1,
                doWhenArrive: "withdrawEnergy"
            });
            CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });
            if (index === sources.length - 1) {
                const maxEnergyNum = 5e5;
                RoutePlan.addCondition({
                    routeName,
                    condition: "store",
                    jumpTo: 2,
                    conditionArgs: `${PosStr.setPosToStr(
                        Game.flags[containerFlagName].pos
                    )},${RESOURCE_ENERGY},>=,${maxEnergyNum}`
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: storageFlagName,
                    range: 1,
                    doWhenArrive: "transferEnergy"
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: containerFlagName,
                    range: 50,
                    doWhenArrive: "pause"
                });
            }
        }

        return "end";
    },
    justFinished() {
        return "end";
    }
};
