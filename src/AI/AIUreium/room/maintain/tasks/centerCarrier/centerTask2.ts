import { CreepGroup } from "frame/creep/group";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const centerTask2: TaskObject<maintainRoomTaskArgs> = {
    name: "centerTask2",
    description:
        "center creep carry source from storage to link, and keep resource num in storage and terminal to be normal",
    working(roomName) {
        const room = Game.rooms[roomName];
        if (!room.memory.construct.centerPos) throw new Error("没有centerPos!");
        const creepGroupName = `${room.name}CenterCarry`;
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "centerCarrierTask2" });
        return "end";
    }
};
