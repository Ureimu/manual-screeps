export function calcPowerToGPL(gclLevel: number): number {
    return Math.pow(gclLevel, 2) * 1000;
}

export function calcBasePowerToNextGPL(gclLevel: number): number {
    return Math.pow(gclLevel + 1, 2) * 1000 - Math.pow(gclLevel, 2) * 1000;
}
