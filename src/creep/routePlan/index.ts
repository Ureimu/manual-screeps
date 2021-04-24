import createElement from "utils/console/createElement";

export function callOnStart(): void {
    if (!Memory.routes) Memory.routes = {};
}

export class routePlan {
    public static addMidpoint(): string {
        const commitFunctionName = "routePlanCommit.addMidpoint";
        return createElement.form(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "routeName",
                    label: "路径名称",
                    type: "select",
                    options: Object.keys(Memory.routes).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "pathMidpointPos", label: "路径点位置", type: "input", placeholder: "flag名称" },
                { name: "range", label: "范围", type: "input", placeholder: "置空则为1" },
                {
                    name: "doWhenArrive",
                    label: "到达时的执行动作",
                    type: "select",
                    options: [
                        { value: "goTo", label: "前往" },
                        { value: "passBy", label: "经由" },
                        { value: "harvestSource", label: "挖能量矿" },
                        { value: "upgradeController", label: "升级控制器" },
                        { value: "signController", label: "给控制器签名" }
                    ]
                },
                {
                    name: "doOnLoad",
                    label: "装载时的执行动作",
                    type: "select",
                    options: [
                        { value: "loadIfExist", label: "若有的话就装" },
                        { value: "loadUntilFull", label: "装满货物" },
                        { value: "notLoad", label: "不装载" }
                    ]
                },
                {
                    name: "doOnUnload",
                    label: "卸载时的执行动作",
                    type: "select",
                    options: [
                        { value: "UnloadIfAccept", label: "若接受的话就卸载" },
                        { value: "UnloadAll", label: "卸载全部" },
                        { value: "combinedTransport", label: "联运" },
                        { value: "notUnload", label: "不卸载" }
                    ]
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`
            }
        );
    }

    public static create(): string {
        const commitFunctionName = "routePlanCommit.create";
        return createElement.form(
            commitFunctionName + String(Game.time),
            [
                { name: "routeName", label: "路径名称", type: "input", placeholder: "路径名称" },
                {
                    name: "ifLoop",
                    label: "是否循环执行",
                    type: "select",
                    options: [
                        { value: "true", label: "是" },
                        { value: "false", label: "否" }
                    ]
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`
            }
        );
    }

    public static chooseRouteForCreep(): string {
        const commitFunctionName = "routePlanCommit.chooseRouteForCreep";
        return createElement.form(
            commitFunctionName + String(Game.time),
            [
                { name: "creepName", label: "creep名称", type: "input", placeholder: "creep名称" },
                {
                    name: "routeName",
                    label: "路径名称",
                    type: "select",
                    options: Object.keys(Memory.routes).map(value => {
                        return { value, label: value };
                    })
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`
            }
        );
    }

    public static setRouteProperties(): string {
        const commitFunctionName = "routePlanCommit.setRouteProperties";
        return createElement.form(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "routeName",
                    label: "路径名称",
                    type: "select",
                    options: Object.keys(Memory.routes).map(value => {
                        return { value, label: value };
                    })
                },
                {
                    name: "ifLoop",
                    label: "是否循环执行",
                    type: "select",
                    options: [
                        { value: "true", label: "是" },
                        { value: "false", label: "否" }
                    ]
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`
            }
        );
    }

    public static showRoutes(): string {
        const commitFunctionName = "routePlanCommit.showRoutes";
        return createElement.form(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "routeName",
                    label: "路径名称",
                    type: "select",
                    options: Object.keys(Memory.routes).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "roomName", label: "房间名称", type: "input", placeholder: "房间名称" },
                {
                    name: "ifRun",
                    label: "是否执行",
                    type: "select",
                    options: [
                        { value: "true", label: "是" },
                        { value: "false", label: "否" }
                    ]
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`
            }
        );
    }
}

declare global {
    interface Memory {
        routes: {
            [name: string]: {
                routeDetailArray: RouteMidpointDetail[];
                ifLoop: boolean;
                ifShow: boolean;
            };
        };
    }
}

export interface RouteMidpointDetail {
    pathMidpointPos: string;
    range: number;
    doWhenArrive: string;
    doOnLoad: string;
    doOnUnload: string;
}
