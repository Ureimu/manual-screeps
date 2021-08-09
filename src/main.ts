import { runAi } from "./AIUreium";
import { runFrame } from "./frame";
import { runAllAcrossTickTask } from "./utils/AcrossTick";
import { ErrorMapper } from "./utils/ErrorMapper";
import { enable, wrap } from "profiler";
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
