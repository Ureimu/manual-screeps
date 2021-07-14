declare global {
    namespace NodeJS {
        interface Global {
            creepRoleActionList: { [name: string]: (creep: Creep) => void };
        }
    }
}
export function runCreepByRole(creep: Creep): void {
    global.creepRoleActionList[creep.memory.role](creep);
}
export interface CreepRoleList {
    [name: string]: (creep: Creep) => void;
}
export function registerCreepRole(creepRoleActionList: CreepRoleList): void {
    global.creepRoleActionList = creepRoleActionList;
}
export function setRoleForCreep(args: { roleName: string; creepName: string }): void {
    const { roleName, creepName } = args;
    const creepMemory = Memory.creeps[creepName];
    creepMemory.role = roleName;
    creepMemory.mode = "role";
    console.log(`设置creep ${creepName} 的role为${roleName}完成`);
}
