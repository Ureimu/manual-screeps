export function calcGetPowerSpawnTime(blankSpaceCount: number, index: number) {
    if (blankSpaceCount <= 0) return 0;
    if (index === 0) return 0;
    let totalTime = 0;
    for (let i = 1; i <= index; i++) {
        if (i % blankSpaceCount === 0) {
            totalTime += 1500;
        } else {
            totalTime += 150;
        }
    }
    return totalTime;
}
