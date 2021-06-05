import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.creepGroups) Memory.creepGroups = {};
}

export class creepGroupForm {
    public static create(): string {
        const commitFunctionName = "CreepGroup.create";
        return createForm(
            commitFunctionName + String(Game.time),
            [{ name: "creepGroupName", label: "creep组名称", type: "input", placeholder: "creep组名称" }],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static addCreep(): string {
        const commitFunctionName = "CreepGroup.addCreep";
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
        const commitFunctionName = "CreepGroup.moveCreep";
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
        const commitFunctionName = "CreepGroup.setCreepGroupProperties";
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
        const commitFunctionName = "CreepGroup.showCreepGroups";
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

    public static deleteCreep(): string {
        const commitFunctionName = "CreepGroup.deleteCreep";
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
                { name: "creepName", label: "creep名称", type: "input", placeholder: "creep名称" }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static deleteCreepGroup(): string {
        const commitFunctionName = "CreepGroup.deleteCreepGroup";
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
