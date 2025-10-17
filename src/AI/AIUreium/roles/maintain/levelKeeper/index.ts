const creepIsWorking: {
    [name: string]: { working: boolean; containerId?: Id<StructureContainer> | Id<StructureStorage> };
} = {};
const energyLimit = 250;
export function levelKeeper(creep: Creep): void {
    if (!creepIsWorking[creep.name]) {
        creepIsWorking[creep.name] = { working: false };
    }
    const state = creepIsWorking[creep.name];
    if (state.working && creep.store[RESOURCE_ENERGY] === 0) {
        // State switching logic
        state.working = false;
    }
    if (!state.working && creep.store.getFreeCapacity() === 0) {
        state.working = true;
    }

    // Working state: upgrade controller
    if (state.working) {
        if (creep.room.controller) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            }
        }
        return;
    }

    // Collecting energy state
    if (!state.containerId || (Game.getObjectById(state.containerId)?.store.energy ?? 0) < energyLimit) {
        const target =
            ((creep.room.storage?.store?.energy ?? 0) > energyLimit ? creep.room.storage : null) ||
            creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => {
                    return (
                        structure.structureType === STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > energyLimit
                    );
                }
            });
        if (target) state.containerId = target?.id as Id<StructureContainer> | Id<StructureStorage>;
    }

    if (!state.containerId) return;
    const container = Game.getObjectById(state.containerId);
    if (container && container.store.energy > energyLimit) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {
                visualizePathStyle: { stroke: "#ffaa00" }
            });
        }
    }
}
