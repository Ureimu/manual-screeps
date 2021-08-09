import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const buildSourceContainer: TaskObject<maintainRoomTaskArgs> = {
    name: "buildSourceContainer",
    description: "buildSourceContainer",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        if (room.memory.construct.construction.container?.sourceContainer?.hasPutSites) {
            return "end";
        }
        return "running";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        if (room.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
            return "end";
        }
        const sources = room.find(FIND_SOURCES);
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        for (let index = 0; index < sources.length; index++) {
            const routeName = `${room.name}buildSourceContainer${index}`;
            const creepGroupName = `${room.name}h${index}`;
            const sourceFlagName = FlagTools.getName(room.name, "source", index);
            const containerSiteFlagName = Game.flags[sourceFlagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("containerConstructionSite") !== -1
            })[0]?.name;

            RoutePlan.create({ routeName, ifLoop: "true" });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: sourceFlagName,
                range: 1,
                doWhenArrive: "harvestSource"
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: containerSiteFlagName,
                range: 0,
                doWhenArrive: "build"
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: containerSiteFlagName,
                range: 1,
                doWhenArrive: "pause"
            });
            CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
