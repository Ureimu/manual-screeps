import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep): state {
    const scoutRoomName = global.creepMemory[creep.name].scoutRoomName;
    const targetRoom = Game.rooms[scoutRoomName as string];

    if (typeof targetRoom !== "undefined") {
        console.log(`进入room${targetRoom.name}`);
        // getNewSource(targetRoom);
        // getScoutInfo(targetRoom);
        // manageOutwardsSourceMaintain(targetRoom);
    }

    if (scoutRoomName) {
        if (creep.room.name !== scoutRoomName) {
            creep.moveTo(new RoomPosition(25, 25, scoutRoomName));
            return "arrived";
        }
    }
    return "moving";
}

export const scoutRoom: CreepAction = {
    run,
    name: "scoutRoom",
    description: "侦察房间",
    type: "move"
};
