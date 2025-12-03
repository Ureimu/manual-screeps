import { startNewRoom } from "AI/AIUreium/room/newRoom/start";
import { avoidEnemyRooms, getCostMatrix } from "frame/construct/utils/costMatrix";
import { logManager } from "utils/log4screeps";
import { getMyRoom } from "utils/roomTools";
import { getRoomControlData } from "..";
import { getNewRoom } from "./getRoom";

const logger = logManager.createLogger("debug", "allocateNewRoom");

export function allocateNewRoom(): void {
    const newRoomName = getNewRoom();
    if (!newRoomName) return;
    const myClosestRoomName = getMyClosestRoomForClaim(newRoomName);
    if (!myClosestRoomName) {
        logger.log(`找不到能够claim${newRoomName}的房间`);
        return;
    }
    logger.log(`开始从房间${myClosestRoomName}占领房间${newRoomName}。`);
    startNewRoom(myClosestRoomName, newRoomName);
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
        if (controller && controller.level <= 3) {
            logger.debug(`${myRoomName} controller level is lower than 3`);
            return [myRoomName, 700] as [string, number];
        }
        if (!getRoomControlData(myRoomName)?.claimNewRoom) {
            logger.debug(`${myRoomName} setting.claimNewRoom is set to false`);
            return [myRoomName, 700] as [string, number];
        }
        const pathResult = PathFinder.search(
            Game.rooms[myRoomName].find(FIND_MY_SPAWNS)[0].pos,
            new RoomPosition(25, 25, goalRoomName),
            {
                maxOps: 100000,
                roomCallback: avoidEnemyRooms
            }
        );
        if (pathResult.path[pathResult.path.length - 1].roomName !== goalRoomName) {
            logger.debug(
                `${myRoomName} cannot find path to ${goalRoomName}, last path pos: ${
                    pathResult.path[pathResult.path.length - 1]
                }`
            );
            return [myRoomName, 700] as [string, number];
        } else {
            logger.debug(`${myRoomName} find path to ${goalRoomName} with length: ${pathResult.path.length}`);
            return [myRoomName, pathResult.path.length] as [string, number];
        }
    })
        .filter(a => a[1] < 500)
        .sort((a, b) => a[1] - b[1])?.[0]?.[0];
    return closestRoom;
}
