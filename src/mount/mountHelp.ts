/* eslint-disable @typescript-eslint/unbound-method */
import GlobalAlias from "../help";

// 挂载全局拓展
export default function mountGlobalHelp(): void {
    // 挂载有别名的操作
    GlobalAlias.map(item => {
        Object.defineProperty(global, item.alias, { get: item.exec });
    });
    // 挂载没有别名的操作
    _.assign(global, {});
}
