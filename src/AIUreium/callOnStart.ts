import { callOnStart as roomCallOnStart } from "./room/callOnStart";

const functionList: (() => void)[] = [roomCallOnStart];

export function callOnStart(): void {
    functionList.forEach(func => func());
}
