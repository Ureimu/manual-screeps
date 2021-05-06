import { callOnStart as creepGroup } from "creep/group";
import { callOnStart as routePlan } from "creep/routePlan";
import { callOnStart as creepBody } from "creep/body";
import { callOnStart as spawnPool } from "spawn/spawnPool";
import { callOnStart as plugin } from "plugin";
// 挂载全局拓展
export default function mountCallOnStart(): void {
    const startFunctionList = [routePlan, creepGroup, creepBody, spawnPool, plugin];
    startFunctionList.forEach(startFunction => startFunction());
}
