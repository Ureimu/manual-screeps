import { callOnStart as routePlan } from "creep/routePlan";

// 挂载全局拓展
export default function mountCallOnStart(): void {
    const startFunctionList = [routePlan];
    startFunctionList.forEach(startFunction => startFunction());
}
