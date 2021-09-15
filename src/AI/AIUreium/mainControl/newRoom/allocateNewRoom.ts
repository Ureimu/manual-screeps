import { startNewRoom } from "AI/AIUreium/room/newRoom/start";
import { getMyClosestRoom } from "utils/roomTools";
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
