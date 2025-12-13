import { callOnStart as roomCallOnStart } from "./projects/callOnStart";
import { callOnStart as runCreepRole } from "./roles/index";

const functionList: (() => void)[] = [roomCallOnStart, runCreepRole];

export function callOnStart(): void {
    Object.defineProperty(Creep.prototype, "globalMemory", {
        get(this: Creep) {
            if (_.isUndefined(global.creepMemory)) {
                global.creepMemory = {};
            }
            return (global.creepMemory[this.name] = global.creepMemory[this.name] || {});
        },
        set(this: Creep, value: GlobalCreepMemory) {
            if (_.isUndefined(global.creepMemory)) {
                global.creepMemory = {};
            }
            global.creepMemory[this.name] = value;
        }
    });
    functionList.forEach(func => func());
}
