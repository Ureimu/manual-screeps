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
                            functionName: getButton("spawnPool.addCreep"),
                            commandType: true
                        },
                        {
                            title: "删除creep",
                            describe: "删除creep",
                            functionName: getButton("spawnPool.deleteCreep"),
                            commandType: true
                        },
                        {
                            title: "对creep进行设置",
                            describe: "对creep进行设置",
                            functionName: getButton("spawnPool.setCreepProperties"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];