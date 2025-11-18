import { logManager } from "utils/log4screeps";
import { CreepAction } from ".";
import { state } from "..";

const tickLag = 100;
const logger = logManager.createLogger("info", "scouter");

function run(creep: Creep): state {
    const creepGlobalMemory = global.creepMemory[creep.name];
    const scoutRoomName = creepGlobalMemory.scoutRoomName;
    const lastFindPathTick = creepGlobalMemory.lastFindPathTick ?? 0;
    const targetRoom = Game.rooms[scoutRoomName as string];

    if (typeof targetRoom !== "undefined") {
        logger.log(`进入room${targetRoom.name}`);
        // getNewSource(targetRoom);
        // getScoutInfo(targetRoom);
        // manageOutwardsSourceMaintain(targetRoom);
    }

    if (scoutRoomName) {
        const centerPos = new RoomPosition(25, 25, scoutRoomName);
        if (Game.time - lastFindPathTick <= tickLag && !creepGlobalMemory.lastIsOK) {
            return "moving";
        }
        if (Game.time - lastFindPathTick > tickLag) {
            creepGlobalMemory.lastFindPathTick = Game.time;
            const result = PathFinder.search(creep.pos, { pos: centerPos, range: 23 });
            if (result.incomplete) {
                creepGlobalMemory.lastIsOK = false;
                return "moving";
            } else {
                creepGlobalMemory.lastIsOK = true;
            }
        }
        if (creep.room.name !== scoutRoomName) {
            creep.moveTo(centerPos);
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
