import { ProfilerMemory } from "../type";

export class SavePath {
    public get path(): ProfilerMemory | undefined {
        return Memory.profiler;
    }
    public set path(profilerMemory: ProfilerMemory | undefined) {
        Memory.profiler = profilerMemory;
    }
}

declare global {
    interface Memory {
        profiler?: ProfilerMemory;
    }
}
