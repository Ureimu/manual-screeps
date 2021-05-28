import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { PosStr } from "utils/RoomPositionToStr";
import { RoomTaskArgs } from "../taskRelation";

export const keepHarvesting: TaskObject<RoomTaskArgs> = {
    name: "keepHarvesting",
    description: "keepHarvesting",
    start(room) {
        if (Game.time % 15 === 0) {
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "source"])
            });
        }
        if (room.memory.construct.construction.container?.sourceContainer?.hasBuilt) {
            return "end";
        }
        return "running";
    },
    working(room) {
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
            CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
