import { ProfilerConsole } from "../console";

export class FuncPath {
    public get path(): typeof ProfilerConsole {
        return global.profiler;
    }
    public set path(profilerFunctionCollection: typeof ProfilerConsole) {
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
