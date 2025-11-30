import { getStructureMemory } from "frame/construct/utils";
import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskArgs } from "../../type";

export const keepHarvesting: TaskObject<maintainRoomTaskArgs> = {
    name: "keepHarvesting",
    description: "keepHarvesting",
    start(roomName) {
        const room = Game.rooms[roomName];
        if (Game.time % 5 === 0) {
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
            });
        }
        if (getStructureMemory(room.name, "container", "sourceContainer")?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const sources = room.find(FIND_SOURCES);
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
        });
        for (let index = 0; index < sources.length; index++) {
            const routeName = `${room.name}keepHarvesting${index}`;
            const creepGroupName = `${room.name}h${index}`;
            const sourceFlagName = FlagTools.getName(room.name, "source", index);
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
            CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
