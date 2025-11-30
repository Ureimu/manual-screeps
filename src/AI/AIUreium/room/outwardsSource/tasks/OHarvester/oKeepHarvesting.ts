import { getStructureMemory } from "frame/construct/utils";
import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { outwardsSourceProjectName, outwardsSourceTaskArgs } from "../../type";
import { OHarvestGroupCreepName } from "../createCreepGroup/createOHarvestGroup";

export const oKeepHarvesting: TaskObject<outwardsSourceTaskArgs> = {
    name: "oKeepHarvesting",
    description: "oKeepHarvesting",
    start(roomName, sourceRoomName, sourceName) {
        const room = Game.rooms[roomName];
        const sourceRoomMemory = Memory.rooms[sourceRoomName];
        const sourceRoom = Game.rooms[sourceRoomName];
        const roomSourcesMemory = sourceRoomMemory.sources;

        if (!roomSourcesMemory) return "running";
        if (!sourceRoom) return "running";
        if (Game.time % 5 === 0) {
            FlagMaintainer.refresh({
                roomName: sourceRoomName,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite"])
            });
        }
        if (getStructureMemory(sourceRoom.name, "container", "sourceContainer")?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(roomName, sourceRoomName, sourceName) {
        const sourceRoom = Game.rooms[sourceRoomName];
        if (!sourceRoom) return "running";
        FlagMaintainer.refresh({
            roomName: sourceRoomName,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite"])
        });

        const routeName = `${roomName}oKeepHarvesting${sourceName}`;
        const creepGroupName = OHarvestGroupCreepName(roomName, sourceName);
        const sourceFlagName = sourceName;
        const containerFlagName = Game.flags[sourceFlagName].pos.findInRange(FIND_FLAGS, 1, {
            filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        })[0]?.name;
        if (!containerFlagName) return "running";

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 0,
            doWhenArrive: "goTo"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: sourceFlagName,
            range: 1,
            doWhenArrive: "harvestSource",
            actionArgs: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)},true`
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `notFull`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 50,
            doWhenArrive: "buildAndRepairOneStructure",
            actionArgs: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)},${STRUCTURE_CONTAINER}`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
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
