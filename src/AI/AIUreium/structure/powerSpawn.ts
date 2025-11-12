export const powerSpawn = {
    run: (room: Room): void => {
        const powerSpawn: StructurePowerSpawn = room
            .find(FIND_MY_STRUCTURES)
            .filter<StructurePowerSpawn>((i): i is StructurePowerSpawn => i.structureType === "powerSpawn")?.[0];
        if (!powerSpawn) return;
        if (powerSpawn.store.energy >= 50 && powerSpawn.store.power >= 1) {
            powerSpawn.processPower();
        }
    }
};
