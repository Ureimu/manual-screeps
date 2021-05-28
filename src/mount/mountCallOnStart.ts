import { callOnStart as creepGroup } from "creep/group/form";
import { callOnStart as routePlan } from "creep/routePlan/form";
import { callOnStart as creepBody } from "creep/body/form";
import { callOnStart as spawnPool } from "spawn/spawnPool/form";
import { callOnStart as plugin } from "plugin";
import { callOnStart as routeCache } from "creep/action";
import { callOnStart as UreiumAi } from "AIUreium/callOnStart";
// 挂载全局拓展
export default function mountCallOnStart(): void {
    const startFunctionList = [routePlan, creepGroup, creepBody, spawnPool, plugin, routeCache, UreiumAi];
    startFunctionList.forEach(startFunction => startFunction());
}
