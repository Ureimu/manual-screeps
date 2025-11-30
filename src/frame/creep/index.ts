import runCreepAction from "./action";
export function runProjectCreeps(room: Room, projectName: string | undefined) {
    // run creeps
    _.forEach(room.memory.spawnPool, (spawnCreepDetail, creepName) => {
        if (!creepName) return;
        const creep = Game.creeps[creepName];
        if (creep && !creep.spawning && Memory.creepGroups[creep.memory.groupName].projectName === projectName) {
            runCreepAction(creep);
        }
    });
}
