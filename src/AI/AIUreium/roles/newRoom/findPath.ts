import { isEnemyRoom } from "frame/construct/utils/costMatrix";
import { logManager } from "utils/log4screeps";
import { checkHighwayRoomName } from "utils/roomNameUtils";

const routes: {
    [name: string]: {
        exit: ExitConstant;
        room: string;
    }[];
} = {};
const logger = logManager.createLogger("debug", "newRoom.findPath");
export function findPathToNewRoom(creep: Creep, spawnRoomName: string, claimRoomName: string) {
    if (!routes[creep.name]) {
        // find route
        let from = creep.pos;
        let to = new RoomPosition(25, 25, claimRoomName);

        const route = Game.map.findRoute(from.roomName, to.roomName, {
            routeCallback(roomName) {
                let isHighway = checkHighwayRoomName.test(roomName);
                let isMyRoom =
                    Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller?.my;
                if (isHighway || isMyRoom) {
                    return 1;
                } else if (isEnemyRoom(roomName)) {
                    return Infinity;
                } else {
                    return 2.5;
                }
            }
        });
        if (route === -2) {
            logger.debug(`${spawnRoomName} cannot find path route to ${claimRoomName}`);
        } else {
            routes[creep.name] = route;
        }
    }

    const route = routes[creep.name];
    if (route.length > 0) {
        if (creep.pos.roomName === route[0].room) {
            route.shift();
            logger.log("Now heading to room " + route[0].room);
        }

        const exit = creep.pos.findClosestByRange(route[0].exit);
        if (!exit) {
            logger.error(`${route[0].room} cannot find path route exit`);
            return;
        }
        creep.moveTo(exit);
    }
    return;
}
