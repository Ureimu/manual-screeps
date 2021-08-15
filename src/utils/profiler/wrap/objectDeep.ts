/* eslint-disable @typescript-eslint/unbound-method */
import { functionBlackList } from "../constants";
import { AnyFunction } from "../type";
import { profileFunction } from "./function";
import { profileObjectFunctions } from "./object";

export function profileObjectFunctionsDeep<T extends Record<string, unknown>>(object: T, label: string): T {
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
