import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const carrySourceAndFill: TaskObject<maintainRoomTaskArgs> = {
    name: "carrySourceAndFill",
    description: "carrySourceAndFill",
    start(roomName) {
        const room = Game.rooms[roomName];
        if (Game.time % 5 === 0) {
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
    working(roomName) {
        const room = Game.rooms[roomName];
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
