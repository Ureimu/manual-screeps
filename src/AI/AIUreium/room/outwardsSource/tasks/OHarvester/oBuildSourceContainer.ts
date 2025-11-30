import { runLayout } from "frame/construct";
import { baseOutwardsLayout } from "frame/construct/outwardsComposition/baseLayout";
import { getStructureMemory } from "frame/construct/utils";
import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { outwardsSourceProjectName, outwardsSourceTaskArgs } from "../../type";
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
        if (!sourceData.path) {
            const spawnName = room.memory.construct.firstSpawnName?.name;
            if (!spawnName) return "running";
            const ret = PathFinder.search(
                Game.spawns[spawnName].pos,
                { pos: Game.flags[sourceData.sourceName].pos, range: 1 },
                { maxOps: 1000 * 50, roomCallback: getCostMatrix }
            );
            sourceData.path = ret.path.map(pos => PosStr.setPosToStr(pos));
        }
        if (!sourceRoom) return "running";
        baseOutwardsLayout({
            type: "sourceContainer",
            structureType: "container",
            sourceName,
            requireData: [[sourceData.path[sourceData.path.length - 1], 0, 0]],
            layoutRoomName: sourceRoomName
        });
        runLayout(sourceRoom);
        FlagMaintainer.refresh({
            roomName: sourceRoomName,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        if (
            Game.flags[sourceName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("containerConstructionSite") !== -1
            })[0]?.name ||
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
        if (getStructureMemory(sourceRoom.name, "container", "sourceContainer")?.hasBuilt) {
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
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: outwardsSourceProjectName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
