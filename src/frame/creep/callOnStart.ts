export function callOnStart(): void {
    const startFunctionList: (() => unknown)[] = [];
    startFunctionList.forEach(startFunction => startFunction());
}
