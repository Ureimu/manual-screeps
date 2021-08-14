import { profilerFunc, ProfilerMemory } from "..";

export class SavePath {
    public static get path(): ProfilerMemory | undefined {
        return Memory.profiler;
    }
    public static set path(profilerMemory: ProfilerMemory | undefined) {
        Memory.profiler = profilerMemory;
    }
}
export type ProfilerFunc = typeof profilerFunc;
declare global {
    interface Memory {
        profiler?: ProfilerMemory;
    }
}
