import { ProfilerConsole } from "../console";

export class FuncPath {
    public static get path(): typeof ProfilerConsole {
        return global.profiler;
    }
    public static set path(profilerFunctionCollection: typeof ProfilerConsole) {
        global.profiler = profilerFunctionCollection;
    }
}

declare global {
    namespace NodeJS {
        interface Global {
            profiler: typeof ProfilerConsole;
        }
    }
}
