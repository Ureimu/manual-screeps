import { versionCheck } from "version";
import { enable } from "profiler";
import mountCallOnStart from "./mountCallOnStart";
import mountCommit from "./mountCommit";
import mountGlobalMicroFunction from "./mountGlobalFunction";
import mountGlobalFunctionClass from "./mountGlobalFunctionClass";
import mountGlobalFunctionObject from "./mountGlobalFunctionObject";
import mountGlobalHelp from "./mountHelp";

export function mountAll(): void {
    if (!global.reset) {
        mountGlobalHelp();
        mountGlobalFunctionClass();
        mountGlobalFunctionObject();
        mountGlobalMicroFunction();
        mountCallOnStart();
        mountCommit();
        global.reset = true;
        // enable(); // 挂载完所有原型后再启用profiler
        versionCheck();
        console.log("[mount] 挂载扩展");
    }
}
