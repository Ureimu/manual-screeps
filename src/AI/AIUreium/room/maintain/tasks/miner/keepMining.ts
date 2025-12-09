import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../../type";
import { MineGroupName } from "../createCreepGroup/createMineGroup";

export const keepMining: maintainRoomTaskObject = {
    name: "keepMining",
    description: "keepMining",
    start(roomName) {
        const room = Game.rooms[roomName];
        if (Game.time % 5 === 0) {
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
            });
        }
        if (global.roomMemory[room.name].construction?.container?.mineralContainer?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "mineral"])
        });
        const mineralFlagName = FlagTools.getName(roomName, "mineral", 0);

        const routeName = `${room.name}keepMining`;
        const creepGroupName = MineGroupName(room.name);
        const containerFlagName = Game.flags[mineralFlagName].pos.findInRange(FIND_FLAGS, 1, {
            filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        })[0]?.name;
        if (!containerFlagName) return "running";
        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 0,
            doWhenArrive: "keepOnHarvestingMineral",
            actionArgs: PosStr.setPosToStr(Game.flags[mineralFlagName].pos)
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
