import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const harvestToLink: TaskObject<maintainRoomTaskArgs> = {
    name: "harvestToLink",
    description: "harvestToLink",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["link"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const sources = room.find(FIND_SOURCES);
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["link"])
        });
        for (let index = 0; index < sources.length; index++) {
            const routeName = `${room.name}harvestToLink${index}`;
            const creepGroupName = `${room.name}h${index}`;
            const sourceFlagName = FlagTools.getName(room.name, "source", index);
            const containerFlagName = Game.flags[sourceFlagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
            })[0].name;
            const closestSourceLinkFlagName = Game.flags[containerFlagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("link") !== -1 && i.name.indexOf("ConstructionSite") === -1
            })?.[0]?.name;
            if (!closestSourceLinkFlagName) return "running";
            RoutePlan.create({ routeName, ifLoop: "true" });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: sourceFlagName,
                range: 1,
                doWhenArrive: "harvestSource"
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: closestSourceLinkFlagName,
                range: 1,
                doWhenArrive: "transferEnergy"
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: closestSourceLinkFlagName,
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
