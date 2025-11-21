import { startNewRoom } from "AI/AIUreium/room/newRoom/start";
import { avoidEnemyRooms, getCostMatrix } from "frame/construct/utils/costMatrix";
import { logManager } from "utils/log4screeps";
import { getMyRoom } from "utils/roomTools";
import { getRoomControlData } from "..";
import { getNewRoom } from "./getRoom";

const logger = logManager.createLogger("info", "allocateNewRoom");

export function allocateNewRoom(): void {
    const newRoomName = getNewRoom();
    if (!newRoomName) return;
    const myClosestRoomName = getMyClosestRoom(newRoomName);
    if (!myClosestRoomName) {
        logger.log(`找不到能够claim${newRoomName}的房间`);
        return;
    }
    logger.log(`开始从房间${myClosestRoomName}占领房间${newRoomName}。`);
    startNewRoom(myClosestRoomName, newRoomName);
}

export function getMyClosestRoom(goalRoomName: string): string | undefined {
    const MyRoomList = getMyRoom();
    const closestRoom = MyRoomList.map(myRoomName => {
        const controller = Game.rooms[myRoomName].controller;
        if (
            Game.map.getRoomLinearDistance(myRoomName, goalRoomName) > 12 ||
            (controller && controller.level <= 3) ||
            !getRoomControlData(myRoomName)?.claimNewRoom
        ) {
            return [myRoomName, 700] as [string, number];
        }
        return [
            myRoomName,
            PathFinder.search(
                Game.rooms[myRoomName].find(FIND_MY_SPAWNS)[0].pos,
                new RoomPosition(25, 25, goalRoomName),
                {
                    maxOps: 50000,
                    roomCallback: avoidEnemyRooms
                }
            ).path.length
        ] as [string, number];
    })
        .filter(a => a[1] < 500)
        .sort((a, b) => a[1] - b[1])?.[0]?.[0];
    return closestRoom;
}
