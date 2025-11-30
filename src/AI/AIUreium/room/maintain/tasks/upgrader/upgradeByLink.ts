import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskArgs } from "../../type";

export const upgradeByLink: TaskObject<maintainRoomTaskArgs> = {
    name: "upgradeByLink",
    description: "upgradeByLink",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["link"])
        });

        if (!room.memory.construct.layout) return "running";
        const controllerContainerPosStr =
            room.memory.construct.layout.container?.controllerContainer?.requireList[0][0];
        if (!controllerContainerPosStr) throw Error(`${room.name}的controllerContainerPosStr不存在！`);
        const controllerContainerPos = PosStr.getPosFromStr(controllerContainerPosStr);
        const controllerLinkFlag = controllerContainerPos
            .findInRange(FIND_FLAGS, 1)
            .filter(i => i.name.includes("link"))[0];
        const routeName = `${room.name}upgradeByLink`;
        const creepGroupName = `${room.name}up`;
        const controllerFlagName = FlagTools.getName(room.name, "controller", 0);
        const linkFlagName = controllerLinkFlag.name;
        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `full`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: linkFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });

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

        return "end";
    },
    justFinished() {
        return "end";
    }
};
