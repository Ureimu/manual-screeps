import { runAi } from "./AIUreium";
import { runFrame } from "./frame";
import { runAllAcrossTickTask } from "./utils/AcrossTick";
import { ErrorMapper } from "./utils/ErrorMapper";
import { wrap } from "profiler";
require("moveOptimize");
global.version = "0.1.1";
export const loop = ErrorMapper.wrapLoop(() => {
    wrap(function () {
        runAllAcrossTickTask();
        runFrame();
        runAi();
    });
});
