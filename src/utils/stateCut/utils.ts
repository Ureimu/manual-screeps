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
    stateMemory: (number | string)[],
    condition: Record<
        number | string,
        {
            run: (...args: any[]) => string | number;
            description: string;
            name: string;
        }
    >,

    conditionArgs: any[],
    stateIndex: number,
    onStateChange: (name: string, state: string | number, description: string) => void
): number | string {
    while (stateMemory.length <= stateIndex) {
        stateMemory.push("startState");
    }
    // console.log(stateMemory.toString());
    const stateObject = condition[stateMemory[stateIndex]];
    if (!stateObject) console.log(stateMemory[stateIndex], Object.keys(condition));
    //console.log(stateMemory[stateIndex], Object.keys(condition));
    const state = stateObject.run(...conditionArgs);
    if (stateMemory[stateIndex] !== state) {
        stateMemory[stateIndex] = state;
        const newStateObject = condition[state];
        onStateChange(newStateObject.name, state, newStateObject.description);
    }

    return stateMemory[stateIndex];
}
