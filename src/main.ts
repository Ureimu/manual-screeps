import { runAi } from "AI/AIUreium";
import { runFrame } from "frame/main";
import { enable, wrap } from "utils/profiler";
import { ErrorMapper } from "utils/ErrorMapper";
import { SegmentManager } from "utils/SegmentManager";

require("moveOptimize");
global.version = "0.1.1";
enable();
export const loop = ErrorMapper.wrapLoop(() => {
    wrap(function () {
        runFrame();
        runAi();
    });
});
