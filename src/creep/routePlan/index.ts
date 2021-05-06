import { actionIndexedList } from "creep/action/doOnArrived";
import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.routes) Memory.routes = {};
}

export class routePlan {
    public static addMidpoint(): string {
        const commitFunctionName = "routePlanCommit.addMidpoint";
        return createForm(
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
                { name: "flagPos", label: "路径点位置(flag)", type: "input", placeholder: "flag名称" },
                // {
                //     name: "objectPos",
                //     label: "路径点位置(object)",
                //     type: "select",
                //     options: Object.keys(defaultPos).map(value => {
                //         return { value, label: value };
                //     })
                // },
                {
                    name: "roomName",
                    label: "房间名称",
                    type: "select",
                    options: Object.keys(Memory.rooms).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "range", label: "范围", type: "input", placeholder: "置空则为1" },
                {
                    name: "doWhenArrive",
                    label: "到达时的执行动作",
                    type: "select",
                    options: Object.entries(actionIndexedList).map(value => {
                        const [name, CreepAction] = value;
                        return { value: name, label: CreepAction.description };
                    })
                },
                {
                    name: "actionArgs",
                    label: "执行动作传入的参数",
                    type: "input",
                    placeholder: "可选"
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static addCondition(): string {
        const commitFunctionName = "routePlanCommit.addCondition";
        return createForm(
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
                { name: "condition", label: "条件", type: "input", placeholder: "condition" },
                { name: "jumpTo", label: "跳转至", type: "input", placeholder: "jumpTo" }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static create(): string {
        const commitFunctionName = "routePlanCommit.create";
        return createForm(
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static chooseRouteForCreep(): string {
        const commitFunctionName = "routePlanCommit.chooseRouteForCreep";
        return createForm(
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static setRouteProperties(): string {
        const commitFunctionName = "routePlanCommit.setRouteProperties";
        return createForm(
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static showRoutes(): string {
        const commitFunctionName = "routePlanCommit.showRoutes";
        return createForm(
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static deleteRoute(): string {
        const commitFunctionName = "routePlanCommit.deleteRoute";
        return createForm(
            commitFunctionName + String(Game.time),
            [
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static printRouteDetail(): string {
        const commitFunctionName = "routePlanCommit.printRouteDetail";
        return createForm(
            commitFunctionName + String(Game.time),
            [
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
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }
}

declare global {
    interface Memory {
        routes: {
            [name: string]: {
                routeDetailArray: RouteSingleDetail[];
                ifLoop: boolean;
                ifShow: boolean;
            };
        };
    }
}

export type RouteSingleDetail = RouteMidpointDetail | RouteConditionDetail;

export interface RouteMidpointDetail {
    pathMidpointPos: string;
    range: number;
    doWhenArrive: keyof typeof actionIndexedList;
    actionArgs?: string;
}

export interface RouteConditionDetail {
    condition: string;
    jumpTo: number;
    conditionArgs?: string;
}

export function isRouteMidpointDetail(detail: RouteSingleDetail): detail is RouteMidpointDetail {
    return Boolean((detail as RouteMidpointDetail).pathMidpointPos);
}
