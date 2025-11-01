export const MAX_ENERGY_PER_CONTROLLER_LEVEL = Array(9)
    .fill(0)
    .map((i, index) => index)
    .map(
        level =>
            EXTENSION_ENERGY_CAPACITY[level] * CONTROLLER_STRUCTURES.extension[level] +
            SPAWN_ENERGY_CAPACITY * CONTROLLER_STRUCTURES.spawn[level]
    );
