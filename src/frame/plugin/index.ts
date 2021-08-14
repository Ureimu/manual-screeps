import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.plugin) Memory.plugin = {};
}

export class plugin {
    public static loadPlugin(): string {
        const commitFunctionName = "pluginCommit.loadPlugin";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "segmentName",
                    label: "加载插件的segment序号",
                    type: "input",
                    placeholder: "loadPlugin"
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

    public static exportPlugin(): string {
        const commitFunctionName = "pluginCommit.exportPlugin";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "pluginVersion",
                    label: "插件的版本号",
                    type: "input",
                    placeholder: "exportPlugin"
                },
                {
                    name: "pluginName",
                    label: "插件的名称",
                    type: "input",
                    placeholder: "exportPlugin"
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
        plugin: {
            [name: string]: PluginMemory;
        };
    }
}

export interface PluginMemory {
    name: string;
    codeVersion: string;
    version: { code: string; plugin: string };
}
