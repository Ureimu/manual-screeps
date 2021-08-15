/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */

import { profilerCache } from "./constants";
import { profileFunction } from "./wrap/function";
import { profileObjectFunctions } from "./wrap/object";

export function profile(target: Function): void;
export function profile(target: object, key: string | symbol, _descriptor: TypedPropertyDescriptor<Function>): void;
export function profile(
    target: object | Function,
    key?: string | symbol,
    _descriptor?: TypedPropertyDescriptor<Function>
): void {
    if (!profilerCache.enabled) {
        return;
    }

    if (key && typeof key === "string") {
        if (typeof target === "function") {
            // case of method decorator
            profileFunction(target as (...args: any[]) => any, key);
            return;
        }
    }

    // case of class decorator
    const classCopy = target as any;
    if (!classCopy.prototype) {
        return;
    }

    const className = classCopy.name;

    if (typeof classCopy === "function") {
        return;
    } else {
        profileObjectFunctions(classCopy, className as string);
    }
}
