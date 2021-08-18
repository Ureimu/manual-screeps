import { SpecifiedStructureNameList } from "frame/construct/type";
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
            if (
                room.memory.construct.construction[structureType]?.[structureKind]?.hasBuilt &&
                room.memory.construct.construction[structureType]?.[structureKind]?.num &&
                (room.memory.construct.construction[structureType]?.[structureKind]?.num as number) >= num
            ) {
                return "end";
            }
            return "running";
        }
    };
}
