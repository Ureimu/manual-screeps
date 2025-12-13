import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagTools } from "frame/flagMaintainer/tools";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../type";

export const collectSource: maintainRoomTaskObject = {
    name: "collectSource",
    description: "collectSource",
    start(roomName) {
        const room = Game.rooms[roomName];
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const routeName = `${room.name}collectSource`;
        const creepGroupName = `${room.name}col`;
        const controllerFlagName = FlagTools.getName(room.name, "controller", 0);

        RoutePlan.create({ routeName, ifLoop: "true" });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: controllerFlagName,
            range: 50,
            doWhenArrive: "keepOnHarvestingSource"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
