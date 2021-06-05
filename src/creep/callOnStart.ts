import { callOnStart as stayByRoad } from "./action/doOnArrived/stayByRoad";

export function callOnStart(): void {
    const startFunctionList = [stayByRoad];
    startFunctionList.forEach(startFunction => startFunction());
}
