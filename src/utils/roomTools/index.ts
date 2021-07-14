import { registerFN } from "utils/profiler";

/**
 * 判断给定的房间是否可以进入，并且在可以进入的时候将该房间名放入返回的列表。
 *
 * @param {string} roomName
 * @returns {string[]}
 */
export function getAvailableNearbyRooms(roomName: string): string[] {
    const availableRoomNameList: string[] = [];
    const exits = Game.map.describeExits(roomName) as { [name: string]: string };
    for (const direction in exits) {
        // 判断是否在私服，如果在私服则Game.map.getRoomStatus会抛出错误
        if (!Game.cpu.generatePixel) {
            availableRoomNameList.push(exits[direction]);
        } else {
            if (Game.map.getRoomStatus(exits[direction]).status === Game.map.getRoomStatus(roomName).status) {
                availableRoomNameList.push(exits[direction]);
            }
        }
        // console.log(Game.map.getRoomStatus(exits[direction]).status);
    }
    return availableRoomNameList;
}
