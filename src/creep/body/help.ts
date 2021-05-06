import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";

const getButton = (funcName: string) => {
    return creators.button({
        command: `() => functionClass.${funcName}()`,
        content: `${funcName}`,
        type: "button",
        name: funcName
    });
};

export default [
    {
        alias: "creepBody",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "creepBody API",
                    describe: "creep身体部件配置函数。",
                    api: [
                        {
                            title: "创建一条creep身体部件配置",
                            describe: "创建一条creep身体部件配置。",
                            functionName: getButton("creepBody.createConfig"),
                            commandType: true
                        },
                        {
                            title: "设置creep身体部件配置项",
                            describe: "设置creep身体部件配置项",
                            functionName: getButton("creepBody.setConfig"),
                            commandType: true
                        },
                        {
                            title: "删除creep身体部件配置项",
                            describe: "删除creep身体部件配置项",
                            functionName: getButton("creepBody.deleteConfig"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
