import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export function structureHasBuilt(
    structureType: BuildableStructureConstant,
    structureKind: string,
    num: number
): TaskObject<RoomTaskArgs> {
    return {
        name: `${structureKind}HasBuilt`,
        description: `${structureKind}HasBuilt`,
        start() {
            return "end";
        },
        working(room) {
            if (
                room.memory.construct.construction[structureType]?.[structureKind]?.hasBuilt &&
                room.memory.construct.construction[structureType]?.[structureKind]?.num &&
                (room.memory.construct.construction[structureType]?.[structureKind]?.num as number) >= num
            ) {
                return "end";
            }
            return "running";
        },
        justFinished() {
            return "end";
        }
    };
}
