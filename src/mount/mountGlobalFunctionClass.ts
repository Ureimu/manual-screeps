import { creepBody } from "creep/body";
import { creepGroup } from "creep/group";
import { routePlan } from "creep/routePlan";
import { plugin } from "plugin";
import { posMaintainer } from "flagMaintainer";
import { spawnPool } from "spawn/spawnPool";
import { creators } from "utils/console/form";

declare global {
    namespace NodeJS {
        interface Global {
            functionClass: {
                creators: typeof creators;
                routePlan: typeof routePlan;
                creepGroup: typeof creepGroup;
                spawnPool: typeof spawnPool;
                creepBody: typeof creepBody;
                posMaintainer: typeof posMaintainer;
                plugin: typeof plugin;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionClass(): void {
    global.functionClass = { creators, routePlan, creepGroup, spawnPool, creepBody, posMaintainer, plugin };
}
