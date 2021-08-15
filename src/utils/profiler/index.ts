/* eslint-disable @typescript-eslint/unbound-method */
import { profile } from "./decorator";
import { Profiler } from "./engine";
import { profileFunction } from "./wrap/function";
import { enable } from "./wrap/gamePrototypes";
import { wrap } from "./wrap/loop";
import { profileObjectFunctions } from "./wrap/object";
import { profileObjectFunctionsDeep } from "./wrap/objectDeep";

export const output = Profiler.output;
export const callgrind = Profiler.callgrind;

export const registerObject = profileObjectFunctions;
export const registerObjectDeep = profileObjectFunctionsDeep;
export const registerFN = profileFunction;
export const registerClass = profileObjectFunctions;

export { enable, wrap, profile };
