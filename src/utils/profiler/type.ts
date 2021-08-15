export interface ProfileNode {
    calls: number;
    time: number;
    subs: { [name: string]: ProfileNode };
}

export type ProfileType = "stream" | "profile" | "email" | "background";
export type AnyFunction = (...args: any[]) => any;
export interface WrappedData {
    profilerWrapped: boolean;
    toString(): string;
}
export type AnyWrappedFunction = AnyFunction & WrappedData;
export interface ProfilerMemory {
    map: {
        [name: string]: ProfileNode;
    };
    enabledTick: number;
    disableTick: number | false;
    totalTime: number;
    type: ProfileType;
    filter: string;
    InitMemoryTotalTime: number;
}
