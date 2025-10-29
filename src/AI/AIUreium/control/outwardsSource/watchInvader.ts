// 在刚获得视野时和间隔一定时间时运行该函数，以获取invader信息。
const info: {
    [roomName: string]: {
        lastTickRoomExist: boolean;
    };
} = {};
export function watchInvader(roomName: string) {
    if (!info[roomName]) {
        info[roomName] = { lastTickRoomExist: false };
    }

    const room = Game.rooms[roomName];

    if (room && (Game.time % 20 === 0 || !info[roomName].lastTickRoomExist)) {
        // 获取invader信息
        const invaders = room.find(FIND_HOSTILE_CREEPS).filter(i => i.owner.username === "Invader");
        if (invaders.length > 0) {
            if (!room.memory.invaders) {
                room.memory.invaders = { decayTime: 0 };
            }
            const invadersMemory = room.memory.invaders;
            const invaderDecayTime =
                Game.time +
                invaders.reduce(
                    (lastLiveTime, creep) =>
                        (creep.ticksToLive ?? 0) > lastLiveTime ? creep.ticksToLive ?? 0 : lastLiveTime,
                    0
                );
            invadersMemory.decayTime = invaderDecayTime;
        }
    }

    if (!room) {
        info[roomName].lastTickRoomExist = false;
    } else {
        info[roomName].lastTickRoomExist = true;
    }
}
