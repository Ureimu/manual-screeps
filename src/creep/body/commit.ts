import { consoleStyle } from "console/style";
import { ControllerLevels } from ".";
import { bodyTools } from "./tools";

const style = consoleStyle("creepBody");

export const creepBodyCommit = {
    createConfig: (args: { creepBodyConfigName: string }): string => {
        const { creepBodyConfigName } = args;
        if (creepBodyConfigName === "") {
            return style(`creep身体部件配置项名称不可以为空`, "error");
        }
        Memory.creepBodyConfig[creepBodyConfigName] = {};
        return style(`creep身体部件配置项 ${creepBodyConfigName} 创建成功`, "log");
    },
    setConfig: (args: {
        creepBodyConfigName: string;
        controllerLevel: ControllerLevels;
        creepBodyConfig: string;
    }): string => {
        const { creepBodyConfigName, controllerLevel, creepBodyConfig } = args;
        if (bodyTools.check(creepBodyConfig)) {
            Memory.creepBodyConfig[creepBodyConfigName][controllerLevel] = { body: creepBodyConfig };
            return style(
                `设置creep身体部件配置项 ${creepBodyConfigName} level: ${controllerLevel} 为 ${creepBodyConfig} 成功`,
                "log"
            );
        } else {
            return style(`creep身体部件配置项 ${creepBodyConfig} 格式不合法`, "error");
        }
    },
    deleteConfig: (args: { creepBodyConfigName: string }): string => {
        const { creepBodyConfigName } = args;
        // console.log(creepBodyConfigName);
        delete Memory.creepBodyConfig[creepBodyConfigName];
        return style(`删除creep身体部件配置项 ${creepBodyConfigName} 完成`, "log");
    }
};
