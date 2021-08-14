import { profilerFunc } from "..";

export class FuncPath {
    public static get path(): ProfilerFunc {
        return global.profiler;
    }
    public static set path(profilerFunctionCollection: ProfilerFunc) {
        global.profiler = profilerFunctionCollection;
    }
}
export type ProfilerFunc = typeof profilerFunc;
declare global {
    namespace NodeJS {
        interface Global {
            profiler: ProfilerFunc;
        }
    }
}
