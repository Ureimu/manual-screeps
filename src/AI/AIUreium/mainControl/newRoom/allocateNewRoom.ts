import { startNewRoom } from "AI/AIUreium/room/newRoom/start";
import { getMyRoom } from "utils/roomTools";
import { getRoomControlData } from "../controlBoard";
import { getNewRoom } from "./getRoom";

export function allocateNewRoom(): void {
    const newRoomName = getNewRoom();
    if (!newRoomName) return;
    const myClosestRoomName = getMyClosestRoom(newRoomName);
    if (!myClosestRoomName) {
        console.log(`找不到能够claim${newRoomName}的房间`);
        return;
    }
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
            PathFinder.search(new RoomPosition(25, 25, myRoomName), new RoomPosition(25, 25, goalRoomName), {
                maxOps: 20000
            }).path.length
        ] as [string, number];
    })
        .filter(a => a[1] < 500)
        .sort((a, b) => a[1] - b[1])?.[0]?.[0];
    return closestRoom;
}
