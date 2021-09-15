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
        // const start = Game.cpu.getUsed();
        // for (let i = 3; i < 12; i++) {
        //     RawMemory.segments[i] = `${i} ${Game.time}`;
        //     console.log(RawMemory.segments[i]);
        // }
        // console.log(Game.cpu.getUsed() - start);
    });
});
