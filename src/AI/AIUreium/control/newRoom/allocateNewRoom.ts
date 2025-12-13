import { startNewRoom } from "AI/AIUreium/projects/newRoom/start";
import { avoidEnemyRooms, getCostMatrix, isEnemyRoom } from "frame/construct/utils/costMatrix";
import { logManager } from "utils/log4screeps";
import { checkHighwayRoomName } from "utils/roomNameUtils";
import { getMyRoom } from "utils/roomTools";
import { getRoomConfig } from "../../config";

const logger = logManager.createLogger("debug", "allocateNewRoom");

export function allocateNewRoom(roomName: string): void {
    const myClosestRoomName = getMyClosestRoomForClaim(roomName);
    if (!myClosestRoomName) {
        logger.log(`找不到能够claim${roomName}的房间`);
        return;
    }
    logger.log(`开始从房间${myClosestRoomName}占领房间${roomName}。`);
    startNewRoom(myClosestRoomName, roomName);
}

export function tryAllocateTargetRoom(roomName: string) {
    const myClosestRoomName = getMyClosestRoomForClaim(roomName);
    if (!myClosestRoomName) {
        logger.log(`找不到能够claim${roomName}的房间`);
        return;
    }
    logger.log(`找到了从房间${myClosestRoomName}占领房间${roomName}的路线。`);
}

export function getMyClosestRoomForClaim(goalRoomName: string): string | undefined {
    const MyRoomList = getMyRoom();
    const closestRoom = MyRoomList.map(myRoomName => {
        const controller = Game.rooms[myRoomName].controller;
        if (Game.map.getRoomLinearDistance(myRoomName, goalRoomName) > 12) {
            logger.debug(`${myRoomName} is too far from ${goalRoomName}`);
            return [myRoomName, 700] as [string, number];
        }
        if (controller && controller.level < 3) {
            logger.debug(`${myRoomName} controller level is lower than 3`);
            return [myRoomName, 700] as [string, number];
        }
        if (!getRoomConfig(myRoomName)?.claimNewRoom) {
            logger.debug(`${myRoomName} setting.claimNewRoom is set to false`);
            return [myRoomName, 700] as [string, number];
        }

        // find route
        let from = Game.rooms[myRoomName].find(FIND_MY_SPAWNS)[0].pos;
        let to = new RoomPosition(25, 25, goalRoomName);

        // Use `findRoute` to calculate a high-level plan for this path,
        // prioritizing highways and owned rooms
        let allowedRooms = { [from.roomName]: true };
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
            logger.debug(`${myRoomName} cannot find path route to ${goalRoomName}`);
            return [myRoomName, 700] as [string, number];
        } else {
            route.forEach(function (info) {
                allowedRooms[info.room] = true;
            });
        }

        // find path
        const pathResult = PathFinder.search(from, to, {
            maxOps: 100000,
            roomCallback: (roomName: string) => {
                if (allowedRooms[roomName] === undefined) {
                    return false;
                }
                return getCostMatrix(roomName, { swampCost: 1, plainCost: 1, wallCost: 0xff, roadCost: 1 });
            },
            maxCost: 580
        });
        if (pathResult.path[pathResult.path.length - 1].roomName !== goalRoomName) {
            logger.debug(
                `${myRoomName} cannot find path to ${goalRoomName}, last path pos: ${
                    pathResult.path[pathResult.path.length - 1]
                }, ops cost:${pathResult.ops}, length: ${pathResult.path.length}`
            );
            return [myRoomName, 700] as [string, number];
        } else {
            logger.debug(
                `${myRoomName} find path to ${goalRoomName} with length: ${pathResult.path.length}, ops cost:${pathResult.ops}`
            );
            return [myRoomName, pathResult.path.length] as [string, number];
        }
    })
        .filter(a => a[1] < 580)
        .sort((a, b) => a[1] - b[1])?.[0]?.[0];
    return closestRoom;
}
