import { RoomResourceLimit, StructureResourceLimit } from "./type";

export const sellLimitRate = 1.2;
export const buyLimitRate = 0.9;
export const energyCostPrice = 0.09;
export const capacityRate = {
    terminalToStorage: TERMINAL_CAPACITY / STORAGE_CAPACITY
};
const storageResourceLimit: StructureResourceLimit = {
    energy: {
        max: 500e3,
        min: 400e3
    },
    K: {
        max: 40e3,
        min: 20e3
    }
};
const terminalResourceLimit: StructureResourceLimit = _.cloneDeep(storageResourceLimit);
Object.entries(storageResourceLimit).forEach(([resourceType, limit]) => {
    terminalResourceLimit[resourceType].max = Math.floor(limit.max * capacityRate.terminalToStorage);
    terminalResourceLimit[resourceType].min = Math.floor(limit.min * capacityRate.terminalToStorage);
});

export const resourceLimit: RoomResourceLimit = { storage: storageResourceLimit, terminal: terminalResourceLimit };
