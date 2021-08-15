/* eslint-disable @typescript-eslint/unbound-method */
import { functionBlackList } from "../constants";
import { AnyFunction } from "../type";
import { profileFunction } from "./function";

export function profileObjectFunctions<T extends { [name: string]: AnyFunction }>(
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
