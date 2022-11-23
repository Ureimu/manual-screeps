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

let tickNow = 0;
let myRoomList: string[] = [];
export function getMyRoom(): string[] {
    if (tickNow !== Game.time) {
        tickNow = Game.time;
        const returnList: string[] = [];
        _.forEach(Game.rooms, room => {
            if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
                returnList.push(room.name);
            }
        });
        myRoomList = returnList;
        return returnList;
    } else {
        return myRoomList;
    }
}

export function getMyClosestRoom(goalRoomName: string): string | undefined {
    const MyRoomList = getMyRoom();
    const closestRoom = MyRoomList.map(myRoomName => {
        const controller = Game.rooms[myRoomName].controller;
        if (Game.map.getRoomLinearDistance(myRoomName, goalRoomName) > 12 || (controller && controller.level <= 3)) {
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
