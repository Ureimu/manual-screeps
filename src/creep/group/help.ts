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
                            title: "在creep组之间移动creep",
                            describe: "在creep组之间移动creep",
                            functionName: getButton("creepGroup.moveCreep"),
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
                        },
                        {
                            title: "删除creep组",
                            describe: "删除creep组",
                            functionName: getButton("creepGroup.deleteCreepGroup"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
