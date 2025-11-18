import { logManager } from "utils/log4screeps";
import mountCommit from "./mountCommit";
import mountGlobalFunctionClass from "./mountGlobalFunctionClass";
import mountGlobalHelp from "./mountHelp";

const logger = logManager.createLogger("info", "mount.UreimuAi");

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
        logger.log("挂载Ureimu Ai扩展");
    }
}
