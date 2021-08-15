import { profilerCache } from "../constants";
import { Profiler } from "../engine";
import { AnyFunction } from "../type";
import { profileObjectFunctions } from "./object";

export function hookUpPrototypes(): void {
    Profiler.prototypes.forEach(proto => {
        profileObjectFunctions(proto.val as unknown as { [name: string]: AnyFunction }, proto.name);
    });
}

export function enable(): void {
    profilerCache.enabled = true;
    hookUpPrototypes();
}
