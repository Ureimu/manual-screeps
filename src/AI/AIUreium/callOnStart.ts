import { callOnStart as roomCallOnStart } from "./room/callOnStart";
import { callOnStart as runCreepRole } from "./roles/index";
import { callOnStart as centerTask1 } from "./room/maintain/tasks/centerCarrier/centerTask1";
const functionList: (() => void)[] = [roomCallOnStart, runCreepRole, centerTask1];

export function callOnStart(): void {
    functionList.forEach(func => func());
}
