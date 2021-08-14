import { callOnStart as creepGroup } from "frame/creep/group/form";
import { callOnStart as routePlan } from "frame/creep/routePlan/form";
import { callOnStart as creepBody } from "frame/creep/body/form";
import { callOnStart as spawnPool } from "frame/spawn/spawnPool/form";
import { callOnStart as plugin } from "frame/plugin";
import { callOnStart as routeCache } from "frame/creep/action";
import { callOnStart as UreiumAi } from "AI/AIUreium/callOnStart";
import { callOnStart as creep } from "frame/creep/callOnStart";
// 挂载全局拓展
export default function mountCallOnStart(): void {
    const startFunctionList = [routePlan, creepGroup, creepBody, spawnPool, plugin, routeCache, UreiumAi, creep];
    startFunctionList.forEach(startFunction => startFunction());
}
