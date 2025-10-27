import { defaultRoomControlData } from "./defaultSetting";
import { RoomControlData } from "./type";

export function getRoomControlData(roomName: string): RoomControlData {
    return global.roomMemory[roomName].control ?? defaultRoomControlData;
}
