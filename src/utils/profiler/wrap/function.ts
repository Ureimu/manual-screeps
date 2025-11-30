import { AlreadyWrappedError, getFilter, commonProperties, profilerCache } from "../constants";
import { Profiler } from "../engine";
import { SavePath } from "../path/savePath";
import { AnyFunction, WrappedData } from "../type";

export function wrapFunction<T extends AnyFunction>(
    name: string,
    originalFunction: T,
    suffixFunction?: (...args: Parameters<T>) => string
): {
    (this: any, ...args: Parameters<T>): ReturnType<T>;
    profilerWrapped: boolean;
    toString(): string;
} {
    if ((originalFunction as T & WrappedData).profilerWrapped) {
        throw new AlreadyWrappedError();
    }
    // console.log(`wrapping Function ${name}: Ready`);
    function wrappedFunction(this: any, ...args: Parameters<T>) {
        // console.log(`wrapping Function ${name}: wrap`);
        const profilerMemory = new SavePath().path;
        if (Profiler.isProfiling(profilerMemory)) {
            const actualName = suffixFunction ? name + ":" + suffixFunction(...args) : name;
            const nameMatchesFilter = actualName === getFilter();
            const start = Game.cpu.getUsed();
            if (nameMatchesFilter) {
                profilerCache.depth++;
            }
            const curParent = profilerCache.parentFn;
            profilerCache.parentFn = actualName;
            let result;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (this && this.constructor === wrappedFunction) {
                result = new (originalFunction as unknown as { new (...args0: Parameters<T>): ReturnType<T> })(...args);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result = originalFunction.apply(this, args);
            }
            profilerCache.parentFn = curParent;
            if (profilerCache.depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(actualName, end - start, profilerCache.parentFn, profilerMemory);
            }
            if (nameMatchesFilter) {
                profilerCache.depth--;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (this && this.constructor === wrappedFunction) {
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

export function profileFunction<T extends AnyFunction>(
    fn: T,
    functionName: string,
    suffixFunction?: (...args: Parameters<T>) => string
):
    | T
    | {
          (...args: Parameters<T>): ReturnType<T>;
          profilerWrapped: boolean;
          toString(): string;
      } {
    const fnName = functionName || fn.name;
    if (!fnName) {
        console.log("Couldn't find a function name for - ", fn);
        console.log("Will not profile this function.");
        return fn;
    }

    return wrapFunction<T>(fnName, fn, suffixFunction);
}
