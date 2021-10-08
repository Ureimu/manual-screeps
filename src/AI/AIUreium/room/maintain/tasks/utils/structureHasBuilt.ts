import { FullSpecifiedStructureMemory, SpecifiedStructureNameList } from "frame/construct/type";
import { getStructureMemory } from "frame/construct/utils";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export function structureHasBuilt<T extends BuildableStructureConstant>(
    structureType: T,
    structureKind: SpecifiedStructureNameList<T>,
    num: number
): TaskObject<maintainRoomTaskArgs> {
    return {
        name: `${structureKind}HasBuilt`,
        description: `${structureKind}HasBuilt`,
        working(roomName) {
            const room = Game.rooms[roomName];
            if (getStructureMemory(room.name, structureType, structureKind)?.hasBuilt) {
                return "end";
            }
            return "running";
        }
    };
}
