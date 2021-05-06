import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.creepGroups) Memory.creepGroups = {};
}

export class creepGroup {
    public static create(): string {
        const commitFunctionName = "creepGroupCommit.create";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                { name: "creepGroupName", label: "creep组名称", type: "input", placeholder: "creep组名称" },
                {
                    name: "routeName",
                    label: "分配的路径名称",
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

    public static addCreep(): string {
        const commitFunctionName = "creepGroupCommit.addCreep";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                { name: "creepName", label: "creep名称", type: "input", placeholder: "creep名称" },
                {
                    name: "creepGroupName",
                    label: "creep组名称",
                    type: "select",
                    options: Object.keys(Memory.creepGroups).map(value => {
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

    public static moveCreep(): string {
        const commitFunctionName = "creepGroupCommit.moveCreep";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "currentCreepGroupName",
                    label: "现在的creep组名称",
                    type: "select",
                    options: Object.keys(Memory.creepGroups).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "creepName", label: "creep名称", type: "input", placeholder: "creep名称" },
                {
                    name: "newCreepGroupName",
                    label: "新的creep组名称",
                    type: "select",
                    options: Object.keys(Memory.creepGroups).map(value => {
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

    public static setCreepGroupProperties(): string {
        const commitFunctionName = "creepGroupCommit.setCreepGroupProperties";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepGroupName",
                    label: "creep组名称",
                    type: "select",
                    options: Object.keys(Memory.creepGroups).map(value => {
                        return { value, label: value };
                    })
                },
                {
                    name: "routeName",
                    label: "分配的路径名称",
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

    public static showCreepGroups(): string {
        const commitFunctionName = "creepGroupCommit.showCreepGroups";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepGroupName",
                    label: "creep组名称",
                    type: "select",
                    options: Object.keys(Memory.creepGroups).map(value => {
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
}

declare global {
    interface Memory {
        creepGroups: {
            [creepGroupName: string]: {
                creepNameList: string[];
                routeName: string;
                ifShow: boolean;
            };
        };
    }

    interface CreepMemory {
        groupName: string;
    }
}

export interface creepGroupDetail {
    creepNameList: string[];
}
