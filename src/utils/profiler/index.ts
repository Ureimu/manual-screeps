import { FuncPath } from "./path/funcPath";
import { SavePath } from "./path/savePath";

/* eslint-disable @typescript-eslint/unbound-method */
let usedOnStart = 0;
export let enabled = false;
let depth = 0;
let parentFn = "(tick)";

interface ProfileNode {
    calls: number;
    time: number;
    subs: { [name: string]: ProfileNode };
}

type ProfileType = "stream" | "profile" | "email" | "background";
type AnyFunction = (...args: any[]) => any;
interface WrappedData {
    profilerWrapped: boolean;
    toString(): string;
}
type AnyWrappedFunction = AnyFunction & WrappedData;
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

const Profiler = {
    printProfile() {
        console.log(Profiler.output());
    },

    emailProfile() {
        Game.notify(Profiler.output(1000));
    },

    callgrind(profilerData: ProfilerMemory) {
        const elapsedTicks =
            typeof profilerData.disableTick === "number"
                ? profilerData.disableTick - profilerData.enabledTick - 2
                : Game.time - profilerData.enabledTick + 1;
        profilerData.map["(tick)"].calls = elapsedTicks;
        profilerData.map["(tick)"].time = profilerData.totalTime;
        Profiler.checkMapItem("(root)", profilerData);
        profilerData.map["(root)"].calls = 1;
        profilerData.map["(root)"].time = profilerData.totalTime;
        Profiler.checkMapItem("(tick)", profilerData, profilerData.map["(root)"].subs);
        profilerData.map["(root)"].subs["(tick)"].calls = elapsedTicks;
        profilerData.map["(root)"].subs["(tick)"].time = profilerData.totalTime;
        // Profiler.checkMapItem('(InitMemory)', profilerData.map['(tick)'].subs);
        // profilerData.map['(tick)'].subs['(InitMemory)'].calls = elapsedTicks;
        // profilerData.map['(tick)'].subs['(InitMemory)'].time = profilerData.InitMemoryTotalTime;
        let body = `events: ns avg avgCallPerTick\nsummary: ${Math.round(profilerData.totalTime * 1000000)}\n`;
        for (const fnName of Object.keys(profilerData.map)) {
            const fn = profilerData.map[fnName];
            let callsBody = "";
            let callsTime = 0;
            for (const callName of Object.keys(fn.subs)) {
                const call = fn.subs[callName];
                const ns = Math.round(call.time * 1000000);
                callsBody += `cfn=${callName}\ncalls=${call.calls} 1\n1 ${ns} ${Math.round(
                    ns / call.calls
                )} ${Math.round(call.calls / elapsedTicks)}\n`;
                callsTime += call.time;
            }
            body += `\nfn=${fnName}\n1 ${Math.round((fn.time - callsTime) * 1000000)} ${
                Math.round((fn.time - callsTime) * 1000000) / Math.round(callsTime)
            } ${Math.round(Math.round(callsTime) / elapsedTicks)}\n${callsBody}`;
        }
        return body;
    },

    output(passedOutputLengthLimit?: number) {
        const outputLengthLimit = passedOutputLengthLimit || 1000;
        const profilerMemory = SavePath.path;
        if (!profilerMemory || !profilerMemory.enabledTick) {
            return "Profiler not active.";
        }

        const endTick = Math.min(profilerMemory.disableTick || Game.time, Game.time);
        const startTick = profilerMemory.enabledTick + 1;
        const elapsedTicks = endTick - startTick;
        const header = "calls\t\ttime\t\tavg\t\tfunction";
        const footer = [
            `Avg: ${(profilerMemory.totalTime / elapsedTicks).toFixed(2)}`,
            `Total: ${profilerMemory.totalTime.toFixed(2)}`,
            `Ticks: ${elapsedTicks}`
        ].join("\t");

        const lines = [header];
        let currentLength = header.length + 1 + footer.length;
        const allLines = Profiler.lines(profilerMemory);
        let done = false;
        while (!done && allLines.length) {
            const line = allLines.shift();
            // each line added adds the line length plus a new line character.
            if (line && currentLength + line.length + 1 < outputLengthLimit) {
                lines.push(line);
                currentLength += line.length + 1;
            } else {
                done = true;
            }
        }
        lines.push(footer);
        return lines.join("\n");
    },

    lines(profilerData: ProfilerMemory) {
        const stats = Object.keys(profilerData.map)
            .map(functionName => {
                const functionCalls = profilerData.map[functionName];
                return {
                    name: functionName,
                    calls: functionCalls.calls,
                    totalTime: functionCalls.time,
                    averageTime: functionCalls.time / functionCalls.calls
                };
            })
            .sort((val1, val2) => {
                return val2.totalTime - val1.totalTime;
            });

        const lines = stats.map(data => {
            return [data.calls, data.totalTime.toFixed(1), data.averageTime.toFixed(3), data.name].join("\t\t");
        });

        return lines;
    },

    prototypes: [
        { name: "Game", val: Game },
        { name: "Map", val: Game.map },
        { name: "Market", val: Game.market },
        { name: "PathFinder", val: PathFinder },
        { name: "RawMemory", val: RawMemory },
        { name: "ConstructionSite", val: ConstructionSite },
        { name: "Creep", val: Creep },
        { name: "Flag", val: Flag },
        { name: "Mineral", val: Mineral },
        { name: "Nuke", val: Nuke },
        { name: "OwnedStructure", val: OwnedStructure },
        { name: "CostMatrix", val: PathFinder.CostMatrix },
        { name: "Resource", val: Resource },
        { name: "Room", val: Room },
        { name: "RoomObject", val: RoomObject },
        { name: "RoomPosition", val: RoomPosition },
        { name: "RoomVisual", val: RoomVisual },
        { name: "Source", val: Source },
        { name: "Structure", val: Structure },
        { name: "StructureContainer", val: StructureContainer },
        { name: "StructureController", val: StructureController },
        { name: "StructureExtension", val: StructureExtension },
        { name: "StructureExtractor", val: StructureExtractor },
        { name: "StructureKeeperLair", val: StructureKeeperLair },
        { name: "StructureLab", val: StructureLab },
        { name: "StructureLink", val: StructureLink },
        { name: "StructureNuker", val: StructureNuker },
        { name: "StructureObserver", val: StructureObserver },
        { name: "StructurePowerBank", val: StructurePowerBank },
        { name: "StructurePowerSpawn", val: StructurePowerSpawn },
        { name: "StructurePortal", val: StructurePortal },
        { name: "StructureRampart", val: StructureRampart },
        { name: "StructureRoad", val: StructureRoad },
        { name: "StructureSpawn", val: StructureSpawn },
        { name: "StructureStorage", val: StructureStorage },
        { name: "StructureTerminal", val: StructureTerminal },
        { name: "StructureTower", val: StructureTower },
        { name: "StructureWall", val: StructureWall }
    ],

    checkMapItem(
        functionName: string,
        profilerData: ProfilerMemory,
        map?: {
            [name: string]: ProfileNode;
        }
    ) {
        if (!map) {
            map = profilerData.map;
        }
        if (!map[functionName]) {
            // eslint-disable-next-line no-param-reassign
            map[functionName] = {
                time: 0,
                calls: 0,
                subs: {}
            };
        }
    },

    record(functionName: string, time: number, parent: string, profilerData: ProfilerMemory) {
        this.checkMapItem(functionName, profilerData);
        profilerData.map[functionName].calls++;
        profilerData.map[functionName].time += time;
        if (parent) {
            this.checkMapItem(parent, profilerData);
            this.checkMapItem(functionName, profilerData, profilerData.map[parent].subs);
            profilerData.map[parent].subs[functionName].calls++;
            profilerData.map[parent].subs[functionName].time += time;
        }
    },

    endTick(profilerData: ProfilerMemory) {
        if (Game.time >= profilerData.enabledTick) {
            const cpuUsed = Game.cpu.getUsed();
            profilerData.totalTime += cpuUsed;
            Profiler.report(profilerData);
        }
    },

    report(profilerData: ProfilerMemory) {
        if (Profiler.shouldPrint(profilerData)) {
            Profiler.printProfile();
        } else if (Profiler.shouldEmail(profilerData)) {
            Profiler.emailProfile();
        }
    },

    isProfiling(profilerData: ProfilerMemory | undefined): profilerData is ProfilerMemory {
        if (!enabled) {
            return false;
        }
        if (!enabled || !profilerData) {
            return false;
        }
        return !profilerData.disableTick || Game.time <= profilerData.disableTick;
    },

    type(profilerData: ProfilerMemory) {
        return profilerData.type;
    },

    shouldPrint(profilerData: ProfilerMemory) {
        const streaming = Profiler.type(profilerData) === "stream";
        const profiling = Profiler.type(profilerData) === "profile";
        const onEndingTick = profilerData.disableTick === Game.time;
        return streaming || (profiling && onEndingTick);
    },

    shouldEmail(profilerData: ProfilerMemory) {
        return Profiler.type(profilerData) === "email" && profilerData.disableTick === Game.time;
    }
};

export const profilerFunc = {
    stream(duration: number, filter: string): void {
        setupMemory("stream", duration || 10, filter);
    },
    email(duration: number, filter: string): void {
        setupMemory("email", duration || 100, filter);
    },
    profile(duration: number, filter: string): void {
        setupMemory("profile", duration || 100, filter);
    },
    background(filter: string): void {
        setupMemory("background", false, filter);
    },
    callgrind(): void {
        const profilerMemory = SavePath.path;
        if (!profilerMemory) {
            console.log("Profiler not active.");
            return;
        }
        const id = `id${Math.random()}`;
        const download = `
<script>
var element = document.getElementById('${id}');
if (!element) {
element = document.createElement('a');
element.setAttribute('id', '${id}');
element.setAttribute('href', 'data:text/plain;charset=utf-8,${encodeURIComponent(Profiler.callgrind(profilerMemory))}');
element.setAttribute('download', 'callgrind.out.${Game.time}');

element.style.display = 'none';
document.body.appendChild(element);

element.click();
}
</script>
  `;
        console.log(
            download
                .split("\n")
                .map(s => s.trim())
                .join("")
        );
    },
    callgrindStr(): string {
        const profilerMemory = SavePath.path;
        if (!profilerMemory) {
            console.log("Profiler not active.");
            return "Profiler not active.";
        }
        return Profiler.callgrind(profilerMemory);
    },
    restart(): void {
        const profilerMemory = SavePath.path;
        if (Profiler.isProfiling(profilerMemory)) {
            const filter = profilerMemory.filter;
            let duration: false | number = false;
            if (profilerMemory.disableTick) {
                // Calculate the original duration, profile is enabled on the tick after the first call,
                // so add 1.
                duration = profilerMemory.disableTick - profilerMemory.enabledTick + 1;
            }
            const type = profilerMemory.type;
            setupMemory(type, duration, filter);
        }
    },
    reset: resetMemory,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    output: Profiler.output
};

class AlreadyWrappedError extends Error {
    public name: string;
    public message: string;
    public stack: string | undefined;
    public constructor() {
        super();
        this.name = "AlreadyWrappedError";
        this.message = "Error attempted to double wrap a function.";
        this.stack = new Error().stack;
    }
}

function setupProfiler() {
    depth = 0; // reset depth, this needs to be done each tick.
    parentFn = "(tick)";
    FuncPath.path = profilerFunc;
}

function setupMemory(profileType: ProfileType, duration: number | boolean, filter: string) {
    resetMemory();
    // eslint-disable-next-line id-blacklist
    const disableTick = Number.isInteger(duration) ? Game.time + (duration as number) : false;
    if (!SavePath.path) {
        SavePath.path = {
            map: {},
            totalTime: 0,
            InitMemoryTotalTime: 0,
            enabledTick: Game.time + 1,
            disableTick,
            type: profileType,
            filter
        };
    }
}

function resetMemory(): void {
    SavePath.path = undefined;
}

let getInitMemoryUsed = function (): unknown {
    return void 0;
};

function getFilter() {
    return SavePath.path?.filter;
}

const functionBlackList = [
    "getUsed", // Let's avoid wrapping this... may lead to recursion issues and should be inexpensive.
    "constructor" // es6 class constructors need to be called with `new`
];

const commonProperties = ["length", "name", "arguments", "caller", "prototype"];

function wrapFunction<T extends AnyFunction>(name: string, originalFunction: T) {
    if ((originalFunction as T & WrappedData).profilerWrapped) {
        throw new AlreadyWrappedError();
    }
    // console.log(`wrapping Function ${name}: Ready`);
    function wrappedFunction(this: any, ...args: Parameters<T>) {
        // console.log(`wrapping Function ${name}: wrap`);
        const profilerMemory = SavePath.path;
        if (Profiler.isProfiling(profilerMemory)) {
            const nameMatchesFilter = name === getFilter();
            const start = Game.cpu.getUsed();
            if (nameMatchesFilter) {
                depth++;
            }
            const curParent = parentFn;
            parentFn = name;
            let result;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (this && this.constructor === wrappedFunction) {
                result = new (originalFunction as unknown as { new (...args: Parameters<T>): ReturnType<T> })(...args);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result = originalFunction.apply(this, args);
            }
            parentFn = curParent;
            if (depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(name, end - start, parentFn, profilerMemory);
            }
            if (nameMatchesFilter) {
                depth--;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (this && this.constructor === wrappedFunction) {
            return new (originalFunction as unknown as { new (...args: Parameters<T>): ReturnType<T> })(...args);
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

function hookUpPrototypes() {
    Profiler.prototypes.forEach(proto => {
        profileObjectFunctions(proto.val as unknown as { [name: string]: AnyFunction }, proto.name);
    });
}

function profileObjectFunctions<T extends { [name: string]: AnyFunction }>(
    object: T,
    label: string
): {
    [P in keyof T]: T[P] & { profilerWrapped: boolean; toString(): string };
} {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (object.prototype) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        profileObjectFunctions(object.prototype as unknown as { [name: string]: AnyFunction }, label);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const objectToWrap = object;
    // console.log(`profiling Object ${label}`);
    Object.getOwnPropertyNames(objectToWrap).forEach(functionName => {
        const extendedLabel = `${label}.${functionName}`;
        // console.log(`profiling Function ${extendedLabel}`);
        const isBlackListed = functionBlackList.indexOf(functionName) !== -1;
        if (isBlackListed) {
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(objectToWrap, functionName);
        if (!descriptor) {
            return;
        }

        const hasAccessor = descriptor.get || descriptor.set;
        if (hasAccessor) {
            const configurable = descriptor.configurable;
            if (!configurable) {
                return;
            }

            const profileDescriptor: { get?: AnyFunction; set?: AnyFunction } = {};

            if (descriptor.get) {
                const extendedLabelGet = `${extendedLabel}:get`;
                profileDescriptor.get = profileFunction(descriptor.get, extendedLabelGet);
            }

            if (descriptor.set) {
                const extendedLabelSet = `${extendedLabel}:set`;
                profileDescriptor.set = profileFunction(descriptor.set, extendedLabelSet);
            }

            Object.defineProperty(objectToWrap, functionName, profileDescriptor);
            return;
        }

        const isFunction = typeof descriptor.value === "function";
        if (!isFunction || !descriptor.writable) {
            return;
        }
        const originalFunction = objectToWrap[functionName];
        (objectToWrap as { [name: string]: AnyFunction | unknown })[functionName] = profileFunction(
            originalFunction,
            extendedLabel
        );
    });

    return objectToWrap as {
        [P in keyof T]: T[P] & { profilerWrapped: boolean; toString(): string };
    };
}

function profileObjectFunctionsDeep<T extends Record<string, unknown>>(object: T, label: string): T {
    if (object.prototype) {
        profileObjectFunctions(object.prototype as { [name: string]: AnyFunction }, label);
    }
    const objectToWrap = object;

    Object.getOwnPropertyNames(objectToWrap).forEach(functionName => {
        const extendedLabel = `${label}.${functionName}`;

        const isBlackListed = functionBlackList.indexOf(functionName) !== -1;
        if (isBlackListed) {
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(objectToWrap, functionName);
        if (!descriptor) {
            return;
        }

        const hasAccessor = descriptor.get || descriptor.set;
        if (hasAccessor) {
            const configurable = descriptor.configurable;
            if (!configurable) {
                return;
            }

            const profileDescriptor: { get?: AnyFunction; set?: AnyFunction } = {};

            if (descriptor.get) {
                const extendedLabelGet = `${extendedLabel}:get`;
                profileDescriptor.get = profileFunction(descriptor.get, extendedLabelGet);
            }

            if (descriptor.set) {
                const extendedLabelSet = `${extendedLabel}:set`;
                profileDescriptor.set = profileFunction(descriptor.set, extendedLabelSet);
            }

            Object.defineProperty(objectToWrap, functionName, profileDescriptor);
            return;
        }

        const isFunction = typeof descriptor.value === "function";
        if (!isFunction || !descriptor.writable) {
            if (typeof descriptor.value === "object") {
                (objectToWrap[functionName] as Record<string, AnyFunction>) = profileObjectFunctionsDeep(
                    objectToWrap[functionName] as Record<string, AnyFunction>,
                    extendedLabel
                );
            } else {
                return;
            }
        }

        const originalFunction = objectToWrap[functionName];
        (objectToWrap as unknown as { [name: string]: unknown })[functionName] = profileFunction(
            originalFunction as AnyFunction,
            extendedLabel
        );
    });

    return objectToWrap;
}

function profileFunction<T extends AnyFunction>(
    fn: T,
    functionName: string
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

    return wrapFunction<T>(fnName, fn);
}

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
        const profilerMemory = SavePath.path;
        if (Profiler.isProfiling(profilerMemory)) {
            const nameMatchesFilter = name === getFilter();
            if (nameMatchesFilter) {
                depth++;
            }
            const curParent = parentFn;
            parentFn = name;
            let result;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (this && this.constructor === wrappedFunction) {
                // eslint-disable-next-line new-cap
                result = new (originalFunction as unknown as { new (...args: Parameters<T>): ReturnType<T> })(...args);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result = originalFunction.apply(this, args);
            }
            parentFn = curParent;
            if (depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(name, end - start, parentFn, profilerMemory);
            }
            if (nameMatchesFilter) {
                depth--;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (this && this.constructor === wrappedFunction) {
            // eslint-disable-next-line new-cap
            return new (originalFunction as unknown as { new (...args: Parameters<T>): ReturnType<T> })(...args);
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

export function wrap(callback: () => void): void {
    getInitMemoryUsed();

    if (enabled) {
        setupProfiler();
    }
    const profileMemory = SavePath.path;
    if (Profiler.isProfiling(profileMemory)) {
        usedOnStart = Game.cpu.getUsed();

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

export function enable(): void {
    enabled = true;
    hookUpPrototypes();
}

export const output = Profiler.output;
export const callgrind = Profiler.callgrind;
export const registerObject = profileObjectFunctions;
export const registerObjectDeep = profileObjectFunctionsDeep;
export const registerFN = profileFunction;
export const registerClass = profileObjectFunctions;
