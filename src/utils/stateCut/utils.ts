/**
 * 一个多态状态机。
 *
 * @export
 * @param {number[]} stateMemory
 * @param {{ run: (...args: any[]) => number; description: string }[]} condition
 * @param {number} stateIndex
 * @param {(stateNum: number, description: string) => void} onStateChange
 * @returns {number}
 */
export function stateCut(
    stateMemory: number[],
    condition: { run: (...args: any[]) => number; description: string; name: string }[],
    conditionArgs: any[],
    stateIndex: number,
    onStateChange: (name: string, stateNum: number, description: string) => void
): number {
    while (stateMemory.length <= stateIndex) {
        stateMemory.push(0);
    }
    // console.log(stateMemory.toString());
    const stateNum = condition[Number(stateMemory[stateIndex])].run(...conditionArgs);
    if (stateMemory[stateIndex] !== stateNum) {
        stateMemory[stateIndex] = stateNum;
        onStateChange(
            condition[Number(stateMemory[stateIndex])].name,
            stateNum,
            condition[Number(stateMemory[stateIndex])].description
        );
    }
    return stateMemory[stateIndex];
}
