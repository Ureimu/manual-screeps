import { CreepGroup } from "frame/creep/group";
import { maintainRoomProjectName, maintainRoomTaskObject } from "../../type";

export const centerTask2: maintainRoomTaskObject = {
    name: "centerTask2",
    description:
        "center creep carry source from storage to link, and keep resource num in storage and terminal to be normal",
    working(roomName) {
        const room = Game.rooms[roomName];
        if (!room.memory.construct.centerPos) throw new Error("没有centerPos!");
        const creepGroupName = `${room.name}CenterCarry`;
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "centerCarrierTask2",
            projectName: maintainRoomProjectName
        });
        return "end";
    }
};
