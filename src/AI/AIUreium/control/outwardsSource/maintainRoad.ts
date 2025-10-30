// 在刚获得视野时和间隔一定时间时运行该函数，以获取invader信息。

export function maintainRoad(roomName: string, sourceRoomName: string, sourceName: string) {
    const sourceData = Memory.rooms[sourceRoomName].sources?.[sourceName].roomData[roomName];
    if (!sourceData) return;

    sourceData.maintainRoad = true;
}
