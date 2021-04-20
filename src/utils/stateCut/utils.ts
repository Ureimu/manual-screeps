/**
 * 一个多态状态机。
 *
 * @export
 * @param {number[]} stateMemory
 * @param {((anyOther: Record<string, unknown>) => number)[]} condition
 * @param {number} stateIndex
 * @param {Record<string, unknown>} [anyOther={}]
 * @param {(anyOther: Record<string, unknown>) => null} onStateChange
 * @param {string[]} [say=["🚧 working", "🔄 harvest"]]
 * @returns {number}
 */
export function stateCut(
    stateMemory: number[],
    condition: (() => number)[],
    stateIndex: number,
    onStateChange: (stateNum: number) => void
): number {
    while (stateMemory.length <= stateIndex) {
        stateMemory.push(0);
    }
    // console.log(stateMemory.toString());
    const stateNum = condition[Number(stateMemory[stateIndex])]();
    if (stateMemory[stateIndex] !== stateNum) {
        stateMemory[stateIndex] = stateNum;
        onStateChange(stateNum);
    }
    return stateMemory[stateIndex];
}
