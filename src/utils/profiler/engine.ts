import { profilerCache } from "./constants";
import { SavePath } from "./path/savePath";
import { ProfilerMemory, ProfileNode, ProfileType } from "./type";
import { hookUpPrototypes } from "./wrap/gamePrototypes";

export const Profiler = {
    printProfile(): void {
        console.log(Profiler.output());
    },

    emailProfile(): void {
        Game.notify(Profiler.output(1000));
    },

    callgrind(profilerData: ProfilerMemory): string {
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

    output(passedOutputLengthLimit?: number): string {
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

    lines(profilerData: ProfilerMemory): string[] {
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
    ): void {
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

    record(functionName: string, time: number, parent: string, profilerData: ProfilerMemory): void {
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

    endTick(profilerData: ProfilerMemory): void {
        if (Game.time >= profilerData.enabledTick) {
            const cpuUsed = Game.cpu.getUsed();
            profilerData.totalTime += cpuUsed;
            Profiler.report(profilerData);
        }
    },

    report(profilerData: ProfilerMemory): void {
        if (Profiler.shouldPrint(profilerData)) {
            Profiler.printProfile();
        } else if (Profiler.shouldEmail(profilerData)) {
            Profiler.emailProfile();
        }
    },

    isProfiling(profilerData: ProfilerMemory | undefined): profilerData is ProfilerMemory {
        if (!profilerCache.enabled) {
            return false;
        }
        if (!profilerCache.enabled || !profilerData) {
            return false;
        }
        return !profilerData.disableTick || Game.time <= profilerData.disableTick;
    },

    type(profilerData: ProfilerMemory): ProfileType {
        return profilerData.type;
    },

    shouldPrint(profilerData: ProfilerMemory): boolean {
        const streaming = Profiler.type(profilerData) === "stream";
        const profiling = Profiler.type(profilerData) === "profile";
        const onEndingTick = profilerData.disableTick === Game.time;
        return streaming || (profiling && onEndingTick);
    },

    shouldEmail(profilerData: ProfilerMemory): boolean {
        return Profiler.type(profilerData) === "email" && profilerData.disableTick === Game.time;
    }
};
