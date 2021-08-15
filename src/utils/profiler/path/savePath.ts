import { ProfilerMemory } from "../type";

export class SavePath {
    public static get path(): ProfilerMemory | undefined {
        return Memory.profiler;
    }
    public static set path(profilerMemory: ProfilerMemory | undefined) {
        Memory.profiler = profilerMemory;
    }
}

declare global {
    interface Memory {
        profiler?: ProfilerMemory;
    }
}
