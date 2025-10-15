import { defaultRoomControlData, RoomControlData } from "./type";

export function getRoomControlData(roomName: string): RoomControlData {
    return global.roomMemory[roomName].control ?? defaultRoomControlData;
}
