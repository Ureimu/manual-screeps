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
        alias: "routePlan",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "routePlan API",
                    describe: "creep路线规划函数。",
                    api: [
                        {
                            title: "创建一条路线",
                            describe: "创建一条路线。",
                            functionName: getButton("routePlanForm.create"),
                            commandType: true
                        },
                        {
                            title: "增加中转点",
                            describe: "增加中转点",
                            functionName: getButton("routePlanForm.addMidpoint"),
                            commandType: true
                        },
                        {
                            title: "增加条件式",
                            describe: "增加条件式",
                            functionName: getButton("routePlanForm.addCondition"),
                            commandType: true
                        },
                        // !不建议console使用下方函数，会引起调用bug，请使用creepGroup相关api代替
                        // {
                        //     title: "为creep选择路线",
                        //     describe: "为creep选择路线",
                        //     functionName: getButton("routePlan.chooseRouteForCreep"),
                        //     commandType: true
                        // },
                        {
                            title: "对路线进行设置",
                            describe: "对路线进行设置",
                            functionName: getButton("routePlanForm.setRouteProperties"),
                            commandType: true
                        },
                        {
                            title: "在房间显示路线",
                            describe: "在房间显示路线",
                            functionName: getButton("routePlanForm.showRoutes"),
                            commandType: true
                        },
                        {
                            title: "删除路径",
                            describe: "删除路径",
                            functionName: getButton("routePlanForm.deleteRoute"),
                            commandType: true
                        },
                        {
                            title: "打印路径详细信息",
                            describe: "打印路径详细信息",
                            functionName: getButton("routePlanForm.printRouteDetail"),
                            commandType: true
                        },
                        {
                            title: "获取条件式使用说明",
                            describe: "获取条件式使用说明",
                            functionName: getButton("routePlanForm.printConditionUsage"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
