import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export function structureHasBuilt(
    structureType: BuildableStructureConstant,
    structureKind: string,
    num: number
): TaskObject<maintainRoomTaskArgs> {
    return {
        name: `${structureKind}HasBuilt`,
        description: `${structureKind}HasBuilt`,
        start() {
            return "end";
        },
        working(roomName) {
            const room = Game.rooms[roomName];
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
