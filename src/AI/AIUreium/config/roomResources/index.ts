import { getRoomConfig } from "..";
import { RoomResourceLimit, StructureResourceLimit } from "./type";
export const capacityRate = {
    terminalToStorage: TERMINAL_CAPACITY / STORAGE_CAPACITY
};

const boundedTerminalResourceLimitCache: { [roomName: string]: RoomResourceLimit } = {};

// 对roomSetting有个重要的假定，即设定信息不会在运行时修改。
export function getRoomResourceLimit(roomName: string): RoomResourceLimit {
    const data = getRoomConfig(roomName).roomResources;
    if (data.terminalBoundToStorageLimit) {
        if (!boundedTerminalResourceLimitCache[roomName]) {
            const resourceLimit = data.limit;
            const terminalResourceLimit: StructureResourceLimit = _.cloneDeep(resourceLimit.terminal);
            _.forEach(resourceLimit.storage, (limit, resourceType) => {
                const limitHere = terminalResourceLimit[resourceType as ResourceConstant];
                if (!resourceType || !limitHere) return;
                limitHere.max = Math.floor(limit.max * capacityRate.terminalToStorage);
                limitHere.min = Math.floor(limit.min * capacityRate.terminalToStorage);
            });
            boundedTerminalResourceLimitCache[roomName] = {
                storage: resourceLimit.storage,
                terminal: terminalResourceLimit
            };
        }
        return boundedTerminalResourceLimitCache[roomName];
    } else {
        return data.limit;
    }
}
