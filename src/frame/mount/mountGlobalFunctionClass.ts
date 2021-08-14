import { creepBodyForm } from "frame/creep/body/form";
import { creepGroupForm } from "frame/creep/group/form";
import { routePlanForm } from "frame/creep/routePlan/form";
import { plugin } from "frame/plugin";
import { FlagMaintainerForm } from "frame/flagMaintainer/form";
import { spawnPoolForm } from "frame/spawn/spawnPool/form";
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
