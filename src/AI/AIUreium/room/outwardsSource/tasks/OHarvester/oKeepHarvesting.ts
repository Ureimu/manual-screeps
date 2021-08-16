import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { outwardsSourceTaskArgs } from "../../taskRelation";
import { OHarvestGroupCreepName } from "../createOHarvestGroup";

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
        if (room.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
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
        })[0].name;

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 0,
            doWhenArrive: "keepOnHarvestingSource",
            actionArgs: PosStr.setPosToStr(Game.flags[sourceFlagName].pos)
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
