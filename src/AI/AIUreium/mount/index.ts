import mountCommit from "./mountCommit";
import mountGlobalFunctionClass from "./mountGlobalFunctionClass";
import mountGlobalHelp from "./mountHelp";

export function mountUreimuAiAll(): void {
    if (!global.AIUreium) {
        mountGlobalHelp();
        mountGlobalFunctionClass();
        mountCommit();
        global.AIUreium = {
            version: "0",
            reset: true,
            lastResetTime: Game.time - 1
        };
        console.log("[mount] 挂载Ureimu Ai扩展");
    }
}
