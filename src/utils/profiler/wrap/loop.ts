import { ProfilerConsole } from "../console";
import { AlreadyWrappedError, commonProperties, getFilter, profilerCache } from "../constants";
import { Profiler } from "../engine";
import { FuncPath } from "../path/funcPath";
import { SavePath } from "../path/savePath";
import { AnyFunction, WrappedData } from "../type";

let getInitMemoryUsed = function (): unknown {
    return void 0;
};

getInitMemoryUsed = getInitMemoryUsedProfileFunction(getInitMemoryUsed, "initMemory");

function getInitMemoryUsedProfileFunction(fn: AnyFunction, functionName: string) {
    const fnName = functionName || fn.name;
    if (!fnName) {
        console.log("Couldn't find a function name for - ", fn);
        console.log("Will not profile this function.");
        return fn;
    }

    return wrapGetInitMemoryUsedFunction(fnName, fn);
}

function wrapGetInitMemoryUsedFunction<T extends AnyFunction>(name: string, originalFunction: T) {
    if ((originalFunction as T & WrappedData).profilerWrapped) {
        throw new AlreadyWrappedError();
    }
    function wrappedFunction(this: any, ...args: Parameters<T>) {
        const start = Game.cpu.getUsed(); // 把start移动到if上方，避免isProfiling提前调用memory导致获取不到memory初始化消耗
        const profilerMemory = new SavePath().path;
        if (Profiler.isProfiling(profilerMemory)) {
            const nameMatchesFilter = name === getFilter();
            if (nameMatchesFilter) {
                profilerCache.depth++;
            }
            const curParent = profilerCache.parentFn;
            profilerCache.parentFn = name;
            let result;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (this && this.constructor === wrappedFunction) {
                // eslint-disable-next-line new-cap
                result = new (originalFunction as unknown as { new (...args0: Parameters<T>): ReturnType<T> })(...args);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result = originalFunction.apply(this, args);
            }
            profilerCache.parentFn = curParent;
            if (profilerCache.depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(name, end - start, profilerCache.parentFn, profilerMemory);
            }
            if (nameMatchesFilter) {
                profilerCache.depth--;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (this && this.constructor === wrappedFunction) {
            // eslint-disable-next-line new-cap
            return new (originalFunction as unknown as { new (...args0: Parameters<T>): ReturnType<T> })(...args);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return originalFunction.apply(this, args);
    }

    wrappedFunction.profilerWrapped = true;
    wrappedFunction.toString = () => `// screeps-profiler wrapped function:\n${originalFunction.toString()}`;

    Object.getOwnPropertyNames(originalFunction).forEach(property => {
        if (!commonProperties.includes(property)) {
            (wrappedFunction as unknown as { [name: string]: unknown })[property] =
                originalFunction[property as keyof typeof originalFunction];
        }
    });

    return wrappedFunction;
}

function setupProfiler() {
    profilerCache.depth = 0; // reset profilerCache.depth, this needs to be done each tick.
    profilerCache.parentFn = "(tick)";
    new FuncPath().path = ProfilerConsole;
}

export function wrap(callback: () => void): void {
    getInitMemoryUsed();

    if (profilerCache.enabled) {
        setupProfiler();
    }
    const profileMemory = new SavePath().path;
    if (Profiler.isProfiling(profileMemory)) {
        profilerCache.usedOnStart = Game.cpu.getUsed();

        // Commented lines are part of an on going experiment to keep the profiler
        // performance, and measure certain types of overhead.

        // var callbackStart = Game.cpu.getUsed();
        const returnVal = callback();
        // var callbackEnd = Game.cpu.getUsed();
        Profiler.endTick(profileMemory);
        // var end = Game.cpu.getUsed();

        // var profilerTime = (end - start) - (callbackEnd - callbackStart);
        // var callbackTime = callbackEnd - callbackStart;
        // var unaccounted = end - profilerTime - callbackTime;
        // console.log('total-', end, 'profiler-', profilerTime, 'callBackTime-',
        // callbackTime, 'start-', start, 'unaccounted', unaccounted);
        return returnVal;
    }

    return callback();
}
