import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const upgradeBySource: TaskObject<maintainRoomTaskArgs> = {
    name: "upgradeBySource",
    description: "upgradeBySource",
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
            typeList: FlagMaintainer.getTypeList(["container", "source", "controller"])
        });

        const routeName = `${room.name}upgradeBySource`;
        const creepGroupName = `${room.name}up`;
        const controllerFlagName = FlagTools.getName(room.name, "controller", 0);

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
                conditionArgs: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)},${RESOURCE_ENERGY},<=,800`
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
                    pathMidpointPos: controllerFlagName,
                    range: 3,
                    doWhenArrive: "upgradeController"
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: controllerFlagName,
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
