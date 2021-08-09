import { creepAct } from "creep/action/doOnArrived";
import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.routes) Memory.routes = { "": { routeDetailArray: [], ifLoop: true, ifShow: false } };
}

export class routePlanForm {
    public static addMidpoint(): string {
        const commitFunctionName = "RoutePlan.addMidpoint";
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
                { name: "pathMidpointPos", label: "路径点位置(flag)", type: "input", placeholder: "flag名称" },
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
                    options: Object.entries(creepAct).map(value => {
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
        const commitFunctionName = "RoutePlan.addCondition";
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
                { name: "jumpTo", label: "跳转至", type: "input", placeholder: "jumpTo" },
                {
                    name: "conditionArgs",
                    label: "判断时传入的参数",
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

    public static create(): string {
        const commitFunctionName = "RoutePlan.create";
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
        const commitFunctionName = "RoutePlan.chooseRouteForCreep";
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
        const commitFunctionName = "RoutePlan.setRouteProperties";
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
        const commitFunctionName = "RoutePlan.showRoutes";
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
        const commitFunctionName = "RoutePlan.deleteRoute";
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
        const commitFunctionName = "RoutePlan.printRouteDetail";
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

    public static printConditionUsage(): string {
        const commitFunctionName = "RoutePlan.printConditionUsage";
        return createForm(commitFunctionName + String(Game.time), [], {
            content: "获取条件式使用说明",
            command: `(args) => ${commitFunctionName}(args)`,
            type: "button",
            name: "button" + String(Game.time) + commitFunctionName
        });
    }
}
