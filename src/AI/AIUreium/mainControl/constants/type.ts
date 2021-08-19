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
