import { Profiler } from "./engine";
import { SavePath } from "./path/savePath";
import { ProfileType } from "./type";

export const ProfilerConsole = {
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
                // Calculate the original duration, profile is profilerCache.enabled on the tick after the first call,
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
