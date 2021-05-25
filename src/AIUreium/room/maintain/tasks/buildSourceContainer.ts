import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { flagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const buildSourceContainer: TaskObject<RoomTaskArgs> = {
    name: "buildSourceContainer",
    description: "buildSourceContainer",
    start(room) {
        if (!room.memory.construct.construction.container?.sourceContainer?.hasPutSites) {
            return "running";
        }
        return "end";
    },
    working(room) {
        const sources = room.find(FIND_SOURCES);
        for (let index = 0; index < sources.length; index++) {
            RoutePlan.create({ routeName: "", ifLoop: "true" });
            FlagMaintainer.refresh({
                roomName: room.name,
                typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite"])
            });
            flagTools.getName(room.name, "containerConstructionSite", index);
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
