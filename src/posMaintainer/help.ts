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
        alias: "posMaintainer",
        exec(): string {
            return [
                createFlattenHelp({
                    name: "posMaintainer API",
                    describe: "posMaintainer函数。",
                    api: [
                        {
                            title: "刷新pos",
                            describe: "刷新pos。",
                            functionName: getButton("posMaintainer.refresh"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
