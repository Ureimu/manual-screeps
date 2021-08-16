import { runAi } from "AI/AIUreium";
import { runFrame } from "frame/main";
import { enable, wrap } from "utils/profiler";
import { ErrorMapper } from "utils/ErrorMapper";

require("moveOptimize");
global.version = "0.1.1";
enable();
export const loop = ErrorMapper.wrapLoop(() => {
    wrap(function () {
        // if (Game.time % 1000 === 0) throw new Error("test Error");
        runFrame();
        runAi();
    });
});
