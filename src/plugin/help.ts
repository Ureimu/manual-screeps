import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";

const getButton = (funcName: string) => {
    return creators.button({
        command: `() => fc.${funcName}()`,
        content: `${funcName}`,
        type: "button",
        name: funcName
    });
};

export default [
    {
        alias: "plugin",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "plugin API",
                    describe: "插件管理api。",
                    api: [
                        {
                            title: "加载插件",
                            describe: "加载插件。",
                            functionName: getButton("plugin.loadPlugin")
                        },
                        {
                            title: "导出插件",
                            describe: "导出插件。",
                            functionName: getButton("plugin.exportPlugin")
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
