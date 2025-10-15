import { callOnStart as roomCallOnStart } from "./room/callOnStart";
import { callOnStart as runCreepRole } from "./roles/index";
import { callOnStart as controlBoard } from "./mainControl/controlBoard/callOnStart";
const functionList: (() => void)[] = [roomCallOnStart, runCreepRole, controlBoard];

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
