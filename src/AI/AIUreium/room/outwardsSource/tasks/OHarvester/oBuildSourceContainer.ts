import { runLayout } from "frame/construct";
import { baseOutwardsLayout } from "frame/construct/outwardsComposition/baseLayout";
import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { outwardsSourceTaskArgs } from "../../taskRelation";
import { OHarvestGroupCreepName } from "../createCreepGroup/createOHarvestGroup";

export const oBuildSourceContainer: TaskObject<outwardsSourceTaskArgs> = {
    name: "oBuildSourceContainer",
    description: "oBuildSourceContainer",
    start(roomName, sourceRoomName, sourceName) {
        const room = Game.rooms[roomName];
        const sourceRoomMemory = Memory.rooms[sourceRoomName];
        const sourceRoom = Game.rooms[sourceRoomName];
        const roomSourcesMemory = sourceRoomMemory.sources;

        if (!roomSourcesMemory) return "running";
        const sourceData = roomSourcesMemory[sourceName].roomData[roomName];
        if (!sourceData.path) throw new Error("sourceData.path not exist");
        if (!sourceRoom) return "running";
        baseOutwardsLayout({
            type: "sourceContainer",
            structureType: "container",
            sourceName,
            pos: [sourceData.path[sourceData.pathLength - 1]],
            layoutRoomName: sourceRoomName
        });
        runLayout(sourceRoom);
        FlagMaintainer.refresh({
            roomName: sourceRoomName,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        if (
            (room.memory.construct.construction.container?.sourceContainer?.hasPutSites &&
                Game.flags[sourceName].pos.findInRange(FIND_FLAGS, 1, {
                    filter: i => i.name.indexOf("containerConstructionSite") !== -1
                })[0]?.name) ||
            Game.flags[sourceName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("containerConstructionSite") === -1 && i.name.indexOf("container") !== -1
            })[0]?.name
        ) {
            return "end";
        }
        return "running";
    },
    working(roomName, sourceRoomName, sourceName) {
        const sourceRoom = Game.rooms[sourceRoomName];
        if (!sourceRoom) return "running";
        if (sourceRoom.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
            return "end";
        }
        FlagMaintainer.refresh({
            roomName: sourceRoom.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        const routeName = `${roomName}oBuildSourceContainer${sourceName}`;
        const creepGroupName = OHarvestGroupCreepName(roomName, sourceName);
        const sourceFlagName = sourceName;
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

        return "end";
    },
    justFinished() {
        return "end";
    }
};
