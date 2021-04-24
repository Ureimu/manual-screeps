import { routePlan } from "creep/routePlan";
import createElement from "utils/console/createElement";

declare global {
    namespace NodeJS {
        interface Global {
            functionClass: { createElement: typeof createElement; routePlan: typeof routePlan };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionClass(): void {
    global.functionClass = { createElement, routePlan };
}
