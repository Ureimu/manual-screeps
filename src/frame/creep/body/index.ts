import { consoleStyle } from "frame/console/style";
import { ControllerLevels } from "./type";
import { bodyTools } from "./tools";

const style = consoleStyle("creepBody");

export class CreepBody {
    /**
     * 创建creep身体部件配置项。
     *
     * @static
     * @param {{ creepBodyConfigName: string }} args 名称
     * @returns {string} 一段文字说明
     * @memberof creepBody
     */
    public static createConfig(args: { creepBodyConfigName: string }): string {
        const { creepBodyConfigName } = args;
        if (creepBodyConfigName === "") {
            return style(`creep身体部件配置项名称不可以为空`, "error");
        }
        Memory.creepBodyConfig[creepBodyConfigName] = {};
        return style(`creep身体部件配置项 ${creepBodyConfigName} 创建成功`, "log");
    }
    /**
     * 设置creep身体部件配置项。
     *
     * @static
     * @param {{
     *         creepBodyConfigName: string;
     *         controllerLevel: ControllerLevels;
     *         creepBodyConfig: string;
     *     }} args
     * @returns {string}
     * @memberof creepBody
     */
    public static setConfig(args: {
        creepBodyConfigName: string;
        controllerLevel: ControllerLevels;
        creepBodyConfig: string;
    }): string {
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
    }
    /**
     * 删除creep身体部件配置项。
     *
     * @static
     * @param {{ creepBodyConfigName: string }} args
     * @returns {string}
     * @memberof creepBody
     */
    public static deleteConfig(args: { creepBodyConfigName: string }): string {
        const { creepBodyConfigName } = args;
        // console.log(creepBodyConfigName);
        delete Memory.creepBodyConfig[creepBodyConfigName];
        return style(`删除creep身体部件配置项 ${creepBodyConfigName} 完成`, "log");
    }
}
