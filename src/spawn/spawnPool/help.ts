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
        alias: "spawnPool",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "spawnPool API",
                    describe: "creep spawn规划函数。",
                    api: [
                        {
                            title: "增加creep",
                            describe: "增加creep。",
                            functionName: getButton("spawnPoolForm.addCreep"),
                            commandType: true
                        },
                        {
                            title: "删除creep",
                            describe: "删除creep",
                            functionName: getButton("spawnPoolForm.deleteCreep"),
                            commandType: true
                        },
                        {
                            title: "对creep进行设置",
                            describe: "对creep进行设置",
                            functionName: getButton("spawnPoolForm.setCreepProperties"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
