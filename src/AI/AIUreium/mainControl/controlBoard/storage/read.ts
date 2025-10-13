import { SegmentManager } from "utils/SegmentManager";
import { defaultRoomControlData, RoomControlData } from "./type";
import { writeDataToSegment } from "./write";

export function readDataFromSegments(args: number[]) {
    let originStr = args.reduce((str, id) => (str += SegmentManager.readSegment(Number(id))), "");
    if (!originStr) {
        _.forEach(Game.rooms, (room, roomName) => {
            if (!roomName) return;
            if (!room.controller) return;
            if (!room.controller.my) return;
            global.roomMemory[roomName].control = defaultRoomControlData;
        });
        writeDataToSegment();
        return;
    }
    const controlData: { [roomName: string]: RoomControlData } = JSON.parse(originStr);
    _.forEach(controlData, (data, roomName) => {
        if (!roomName) return;
        global.roomMemory[roomName].control = data;
    });
    return;
}
