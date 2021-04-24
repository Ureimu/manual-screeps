import createElement from "utils/console/createElement";
import { createFlattenHelp } from "utils/createConsoleHelp/flattenHelp";
import { routePlan } from ".";
import colorful from "../../utils/console/colorful";
import { createHelp } from "../../utils/createConsoleHelp/createHelp";

const getButton = (funcName: string) => {
    return createElement.button({
        command: `() => functionClass.${funcName}()`,
        content: `${funcName}`
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
                            functionName: getButton("routePlan.create"),
                            commandType: true
                        },
                        {
                            title: "增加中转点",
                            describe: "增加中转点",
                            functionName: getButton("routePlan.addMidpoint"),
                            commandType: true
                        },
                        {
                            title: "为creep选择路线",
                            describe: "为creep选择路线",
                            functionName: getButton("routePlan.chooseRouteForCreep"),
                            commandType: true
                        },
                        {
                            title: "对路线进行设置",
                            describe: "对路线进行设置",
                            functionName: getButton("routePlan.setRouteProperties"),
                            commandType: true
                        },
                        {
                            title: "在房间显示路线",
                            describe: "在房间显示路线",
                            functionName: getButton("routePlan.showRoutes"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
