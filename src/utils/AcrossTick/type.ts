declare global {
    interface Memory {
        AcrossTick: { [tick: string]: AcrossTickMemory[] };
    }
    namespace NodeJS {
        interface Global {
            AcrossTickTaskFunction: {
                [taskName: string]: (task: AcrossTickMemory) => AcrossTickReturnCode;
            };
            AcrossTick: { [tick: string]: AcrossTickMemory[] };
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
    useGlobal?: boolean;
}

export type AcrossTickReturnCode = "finish" | "emptyTask" | "runAgain";
