export function initGlobalCreepMemory(creep: Creep): void {
    if (!global.creepMemory) global.creepMemory = {};
    if (!global.creepMemory[creep.name])
        (global.creepMemory[creep.name] as Partial<typeof global.creepMemory[""]>) = {};
}
