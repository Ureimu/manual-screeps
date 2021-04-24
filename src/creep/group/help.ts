import createElement from "utils/console/createElement";
import { createFlattenHelp } from "utils/createConsoleHelp/flattenHelp";

const getButton = (funcName: string) => {
    return createElement.button({
        command: `() => functionClass.${funcName}()`,
        content: `${funcName}`
    });
};

export default [
    {
        alias: "creepGroup",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "creepGroup API",
                    describe: "creep组规划函数。",
                    api: [
                        {
                            title: "创建一个creep组",
                            describe: "创建一个creep组。",
                            functionName: getButton("creepGroup.create"),
                            commandType: true
                        },
                        {
                            title: "为creep组增加creep",
                            describe: "为creep组增加creep",
                            functionName: getButton("creepGroup.addCreep"),
                            commandType: true
                        },
                        {
                            title: "对creep组进行设置",
                            describe: "对creep组进行设置",
                            functionName: getButton("creepGroup.setCreepGroupProperties"),
                            commandType: true
                        },
                        {
                            title: "在房间显示creep组",
                            describe: "在房间显示creep组",
                            functionName: getButton("creepGroup.showCreepGroups"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
