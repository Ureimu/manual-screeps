import { SavePath } from "./path/savePath";

export const profilerCache = {
    enabled: false,
    depth: 0,
    parentFn: "(tick)",
    usedOnStart: 0
};

export const functionBlackList = [
    "getUsed", // Let's avoid wrapping this... may lead to recursion issues and should be inexpensive.
    "constructor" // es6 class constructors need to be called with `new`
];

export const commonProperties = ["length", "name", "arguments", "caller", "prototype"];

export class AlreadyWrappedError extends Error {
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

export function getFilter(): string | undefined {
    return new SavePath().path?.filter;
}
