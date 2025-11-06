declare global {
    interface CreepMemory {
        dontPullMe?: boolean;
    }
}

// 直接导出 CommonJS 模块

export function addAvoidRooms(roomName: string): OK | ERR_INVALID_ARGS;
export function deleteAvoidRooms(roomName: string): OK | ERR_INVALID_ARGS;
export const avoidRooms: { [roomName: string]: number };

export = {
    addAvoidRooms,
    deleteAvoidRooms,
    avoidRooms
};
