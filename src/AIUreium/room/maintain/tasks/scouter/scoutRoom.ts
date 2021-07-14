import { CreepGroup } from "creep/group";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../../taskRelation";

export const scoutRoom: TaskObject<RoomTaskArgs> = {
    name: "scoutRoom",
    description: "scoutRoom",
    start() {
        return "end";
    },
    working(room) {
        const creepGroupName = `${room.name}s`;
        return "end";
    },
    justFinished() {
        return "end";
    }
};
