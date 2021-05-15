import { runAi } from "AIUreium";
import { runFrame } from "frame";
import { runAllAcrossTickTask } from "utils/AcrossTick";
import { ErrorMapper } from "utils/ErrorMapper";
import * as profiler from "./utils/profiler";
require("moveOptimize");
global.version = "0.1.1";
export const loop = ErrorMapper.wrapLoop(() => {
    profiler.wrap(function () {
        runFrame();
        runAi();
        runAllAcrossTickTask();
    });
});
