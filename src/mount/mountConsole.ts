import createElement from "utils/console/createElement";

// 挂载全局拓展
export default function mountGlobalHelp(): void {
    // 挂载没有别名的操作
    _.assign(global, createElement);
}
