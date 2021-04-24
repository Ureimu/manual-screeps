import bodypartsGenerator from "utils/bodypartsGenerator";

declare global {
    namespace NodeJS {
        interface Global {
            functionObject: { bodypartsGenerator: any };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionObject(): void {
    global.functionObject = { bodypartsGenerator };
}
