export interface RoomResourceLimit {
    storage: StructureResourceLimit;
    terminal: StructureResourceLimit;
}

export interface StructureResourceLimit {
    [name: string]: {
        max: number;
        min: number;
    };
    energy: {
        max: number;
        min: number;
    };
}
export const capacityRate = {
    terminalToStorage: TERMINAL_CAPACITY / STORAGE_CAPACITY
};
const storageResourceLimit: StructureResourceLimit = {
    energy: {
        max: 300e3,
        min: 100e3
    },
    K: {
        max: 40e3,
        min: 20e3
    }
};
const terminalResourceLimit: StructureResourceLimit = storageResourceLimit;
Object.entries(storageResourceLimit).forEach(([resourceType, limit]) => {
    terminalResourceLimit[resourceType].max = Math.floor(limit.max * capacityRate.terminalToStorage);
    terminalResourceLimit[resourceType].min = Math.floor(limit.min * capacityRate.terminalToStorage);
});

export const resourceLimit: RoomResourceLimit = { storage: storageResourceLimit, terminal: terminalResourceLimit };
