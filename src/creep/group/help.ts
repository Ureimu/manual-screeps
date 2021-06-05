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
                            functionName: getButton("creepGroupForm.create"),
                            commandType: true
                        },
                        {
                            title: "为creep组增加creep",
                            describe: "为creep组增加creep",
                            functionName: getButton("creepGroupForm.addCreep"),
                            commandType: true
                        },
                        {
                            title: "在creep组之间移动creep",
                            describe: "在creep组之间移动creep",
                            functionName: getButton("creepGroupForm.moveCreep"),
                            commandType: true
                        },
                        {
                            title: "对creep组进行设置",
                            describe: "对creep组进行设置",
                            functionName: getButton("creepGroupForm.setCreepGroupProperties"),
                            commandType: true
                        },
                        {
                            title: "在房间显示creep组",
                            describe: "在房间显示creep组",
                            functionName: getButton("creepGroupForm.showCreepGroups"),
                            commandType: true
                        },
                        {
                            title: "删除creep组",
                            describe: "删除creep组",
                            functionName: getButton("creepGroupForm.deleteCreepGroup"),
                            commandType: true
                        },
                        {
                            title: "从creep组删除creep",
                            describe: "从creep组删除creep",
                            functionName: getButton("creepGroupForm.deleteCreep"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
