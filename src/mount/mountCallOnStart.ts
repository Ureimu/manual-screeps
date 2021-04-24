import { callOnStart as creepGroup } from "creep/group";
import { callOnStart as routePlan } from "creep/routePlan";
// 挂载全局拓展
export default function mountCallOnStart(): void {
    const startFunctionList = [routePlan, creepGroup];
    startFunctionList.forEach(startFunction => startFunction());
}
