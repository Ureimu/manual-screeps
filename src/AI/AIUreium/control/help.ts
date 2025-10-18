import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";
const getButton = (alias: string) => {
    return creators.button({
        command: `() => ${alias}`,
        content: `${alias}`,
        type: "button",
        name: alias
    });
};

const getFormButton = (funcName: string) => {
    return creators.button({
        command: `() => AIUreiumFC.${funcName}()`,
        content: `${funcName}`,
        type: "button",
        name: funcName
    });
};

/**
 * 全局拓展的别名
 * 使用别名来方便在控制台执行方法
 *
 * @property {string} alias 别名
 * @property {function} exec 执行别名时触发的操作
 */
export default [
    {
        alias: "ai",
        exec(): string {
            return [
                `\nUreimu ai的高级操作台\n`,

                createFlattenHelp({
                    name: "ai API",
                    describe: "总帮助",
                    api: [
                        {
                            title: "chooseRoom",
                            describe: "选择房间进行设置",
                            functionName: getFormButton("AiRoomSettingForm.chooseRoom"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
