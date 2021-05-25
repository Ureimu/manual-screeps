import { creepBodyForm } from "creep/body/form";
import { creepGroupForm } from "creep/group/form";
import { routePlanForm } from "creep/routePlan/form";
import { plugin } from "plugin";
import { posMaintainerForm } from "flagMaintainer/form";
import { spawnPoolForm } from "spawn/spawnPool/form";
import { creators } from "utils/console/form";
import { mermaid } from "utils/mermaid";

declare global {
    namespace NodeJS {
        interface Global {
            functionClass: {
                creators: typeof creators;
                routePlanForm: typeof routePlanForm;
                creepGroupForm: typeof creepGroupForm;
                spawnPoolForm: typeof spawnPoolForm;
                creepBodyForm: typeof creepBodyForm;
                posMaintainerForm: typeof posMaintainerForm;
                plugin: typeof plugin;
                mermaid: typeof mermaid;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionClass(): void {
    global.functionClass = {
        creators,
        routePlanForm,
        creepGroupForm,
        spawnPoolForm,
        creepBodyForm,
        posMaintainerForm,
        plugin,
        mermaid
    };
}
