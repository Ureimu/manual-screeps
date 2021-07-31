/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import { registerClass, registerFN } from "profiler";

export function profile(target: Function): void;
export function profile(target: object, key: string | symbol, _descriptor: TypedPropertyDescriptor<Function>): void;
export function profile(
    target: object | Function,
    key?: string | symbol,
    _descriptor?: TypedPropertyDescriptor<Function>
): void {
    if (!global.enabled) {
        return;
    }

    if (key) {
        if (typeof target === "function") {
            // case of method decorator
            registerFN(target as (...args: any[]) => any, key);
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
        registerClass(classCopy, className as string);
    }
}
