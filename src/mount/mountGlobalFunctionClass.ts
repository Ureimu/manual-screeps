import { creepBodyForm } from "creep/body/form";
import { creepGroupForm } from "creep/group/form";
import { routePlanForm } from "creep/routePlan/form";
import { plugin } from "plugin";
import { FlagMaintainerForm } from "flagMaintainer/form";
import { spawnPoolForm } from "spawn/spawnPool/form";
import { creators } from "utils/console/form";
import { mermaid } from "utils/Project/mermaid";

declare global {
    namespace NodeJS {
        interface Global {
            fc: {
                creators: typeof creators;
                routePlanForm: typeof routePlanForm;
                creepGroupForm: typeof creepGroupForm;
                spawnPoolForm: typeof spawnPoolForm;
                creepBodyForm: typeof creepBodyForm;
                FlagMaintainerForm: typeof FlagMaintainerForm;
                plugin: typeof plugin;
                mermaid: typeof mermaid;
            };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionClass(): void {
    global.fc = {
        creators,
        routePlanForm,
        creepGroupForm,
        spawnPoolForm,
        creepBodyForm,
        FlagMaintainerForm,
        plugin,
        mermaid
    };
}
