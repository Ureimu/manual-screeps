import { callOnStart as roomCallOnStart } from "./room/callOnStart";
import { callOnStart as runCreepRole } from "./roles/index";
const functionList: (() => void)[] = [roomCallOnStart, runCreepRole];

export function callOnStart(): void {
    functionList.forEach(func => func());
}
