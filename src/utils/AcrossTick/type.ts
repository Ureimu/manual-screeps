declare global {
    interface Memory {
        AcrossTick: { [tick: string]: AcrossTickMemory[] };
    }
}

export interface AcrossTickMemory {
    taskName: string;
    args: unknown[];
    executeTick: number;
    taskCreateTick?: number;
    intervalTick: number;
}
