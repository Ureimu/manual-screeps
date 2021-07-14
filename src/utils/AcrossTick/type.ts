declare global {
    interface Memory {
        AcrossTick: { [tick: string]: AcrossTickMemory[] };
    }
    namespace NodeJS {
        interface Global {
            AcrossTickTaskFunction: {
                [taskName: string]: (task: AcrossTickMemory) => AcrossTickReturnCode;
            };
        }
    }
}

export interface AcrossTickMemory {
    taskName: string;
    args: unknown[];
    executeTick: number;
    taskCreateTick?: number;
    intervalTick: number;
    log: boolean;
}

export type AcrossTickReturnCode = "finish" | "emptyTask" | "runAgain";
