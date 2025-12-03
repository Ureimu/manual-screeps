import { isEnemyRoom } from "frame/construct/utils/costMatrix";
import { logManager } from "utils/log4screeps";
import { checkHighwayRoomName } from "utils/roomNameUtils";
import { findPathToNewRoom } from "../findPath";

const logger = logManager.createLogger("debug", "claimer");
const routes: {
    [name: string]: {
        exit: ExitConstant;
        room: string;
    }[];
} = {};

export function claimer1(creep: Creep, args: string[]): void {
    const [spawnRoomName, claimRoomName] = args;
    if (creep.room.name !== claimRoomName) {
        findPathToNewRoom(creep, spawnRoomName, claimRoomName);
        return;
    }
    const claimRoom = Game.rooms[claimRoomName];
    if (!claimRoom.controller) throw Error("no controller");
    if (creep.pos.isNearTo(claimRoom.controller)) {
        creep.claimController(claimRoom.controller);
    } else {
        creep.moveTo(claimRoom.controller, { range: 1 });
    }
}
