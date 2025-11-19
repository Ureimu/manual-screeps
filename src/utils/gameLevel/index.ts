// 用了平方和公式
export function calcPowerToGPL(gclLevel: number): number {
    return Math.round((gclLevel * (gclLevel + 1) * (2 * gclLevel + 1)) / 6) * 1000;
}

export function calcBasePowerToNextGPL(gclLevel: number): number {
    return Math.pow(gclLevel, 2) * 1000;
}
