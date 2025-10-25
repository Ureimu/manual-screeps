import { versionCheck } from "frame/version";
import { enable } from "utils/profiler";
import mountCallOnStart from "./mountCallOnStart";
import mountCommit from "./mountCommit";
import mountGlobalMicroFunction from "./mountGlobalFunction";
import mountGlobalFunctionClass from "./mountGlobalFunctionClass";
import mountGlobalFunctionObject from "./mountGlobalFunctionObject";
import mountGlobalHelp from "./mountHelp";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "mount");

export function mountAll(): void {
    if (!global.reset) {
        global.gameUserName = Object.values(Game.spawns)[0].owner.username;
        mountGlobalHelp();
        mountGlobalFunctionClass();
        mountGlobalFunctionObject();
        mountGlobalMicroFunction();
        mountCallOnStart();
        mountCommit();
        global.reset = true;
        global.lastResetTime = Game.time - 1;
        // enable(); // 挂载完所有原型后再启用profiler
        versionCheck();
        logger.log("挂载扩展");
    }
}
