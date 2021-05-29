import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { TaskObject } from "utils/ProjectRunner";
import { PosStr } from "utils/RoomPositionToStr";
import { RoomTaskArgs } from "../taskRelation";

export const carrySourceAndFill: TaskObject<RoomTaskArgs> = {
    name: "carrySourceAndFill",
    description: "carrySourceAndFill",
    start(room) {
        if (Game.time % 15 === 0) {
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
            });
        }
        if (room.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(room) {
        const sources = room.find(FIND_SOURCES);
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });

        const routeName = `${room.name}carrySourceAndFill`;
        const creepGroupName = `${room.name}c`;

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
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: containerFlagName,
                    range: 50,
                    doWhenArrive: "fillSpawnAndExtension"
                });
                RoutePlan.addCondition({
                    routeName,
                    condition: "creepStore",
                    jumpTo: 2,
                    conditionArgs: `empty`
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: containerFlagName,
                    range: 50,
                    doWhenArrive: "fillTower"
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
