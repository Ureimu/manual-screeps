import { runAi } from "AI/AIUreium";
import { runFrame } from "frame/main";
import { enable, wrap } from "utils/profiler";
import { runAllAcrossTickTask } from "utils/AcrossTick";
import { ErrorMapper } from "utils/ErrorMapper";

require("moveOptimize");
global.version = "0.1.1";
enable();
export const loop = ErrorMapper.wrapLoop(() => {
    wrap(function () {
        runAllAcrossTickTask();
        runFrame();
        runAi();
    });
});
