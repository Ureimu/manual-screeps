import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.creepBodyConfig) Memory.creepBodyConfig = {};
}

export class creepBodyForm {
    public static createConfig(): string {
        const commitFunctionName = "creepBody.createConfig";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepBodyConfigName",
                    label: "creep身体部件配置项名称",
                    type: "input",
                    placeholder: "creepBodyConfigName"
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

    public static setConfig(): string {
        const commitFunctionName = "creepBody.setConfig";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepBodyConfigName",
                    label: "creep身体部件配置项名称",
                    type: "select",
                    options: Object.keys(Memory.creepBodyConfig).map(value => {
                        return { value, label: value };
                    })
                },
                {
                    name: "controllerLevel",
                    label: "controller等级",
                    type: "select",
                    options: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(value => {
                        return { value: String(value) as ControllerLevels, label: String(value) };
                    })
                },
                {
                    name: "creepBodyConfig",
                    label: "creep身体部件配置项",
                    type: "input",
                    placeholder: "creep身体部件配置项"
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

    public static deleteConfig(): string {
        const commitFunctionName = "creepBody.deleteConfig";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepBodyConfigName",
                    label: "creep身体部件配置项名称",
                    type: "select",
                    options: Object.keys(Memory.creepBodyConfig).map(value => {
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

export type ControllerLevels = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

declare global {
    interface Memory {
        creepBodyConfig: {
            [name: string]: Partial<
                {
                    [p in ControllerLevels]: {
                        body: string;
                    };
                }
            >;
        };
    }
}
