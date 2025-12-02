import { consoleStyle } from "frame/console/style";
import { ControllerLevels } from "./type";
import { bodyTools } from "./tools";
import { logManager } from "utils/log4screeps";
import { creepBodyConfigDetail } from "./type";

const logger = logManager.createLogger("info", "CreepBody");

export class CreepBody {
    /**
     * 创建creep身体部件配置项。
     *
     * @static
     * @param {{ creepBodyConfigName: string }} args 名称
     * @returns {string} 一段文字说明
     * @memberof creepBody
     */
    public static createConfig(args: { creepBodyConfigName: string }): boolean {
        const { creepBodyConfigName } = args;
        if (creepBodyConfigName === "") {
            logger.error(`creep身体部件配置项名称不可以为空`);
            return false;
        }
        Memory.creepBodyConfig[creepBodyConfigName] = {};
        logger.info(`creep身体部件配置项 ${creepBodyConfigName} 创建成功`);
        return true;
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
    }): boolean {
        const { creepBodyConfigName, controllerLevel, creepBodyConfig } = args;
        if (bodyTools.check(creepBodyConfig)) {
            Memory.creepBodyConfig[creepBodyConfigName][controllerLevel] = { body: creepBodyConfig };
            logger.info(
                `设置creep身体部件配置项 ${creepBodyConfigName} level: ${controllerLevel} 为 ${creepBodyConfig} 成功`
            );
            return true;
        } else {
            logger.error(`creep身体部件配置项 ${creepBodyConfig} 格式不合法`);
            return false;
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
    public static deleteConfig(args: { creepBodyConfigName: string }): boolean {
        const { creepBodyConfigName } = args;
        // console.log(creepBodyConfigName);
        delete Memory.creepBodyConfig[creepBodyConfigName];
        logger.info(`删除creep身体部件配置项 ${creepBodyConfigName} 完成`);
        return true;
    }

    /**
     * 获取配置项。
     *
     * @static
     * @param {{ creepBodyConfigName: string }} args
     * @return {*}  {creepBodyConfigDetail}
     * @memberof CreepBody
     */
    public static getConfig(args: { creepBodyConfigName: string }): creepBodyConfigDetail {
        const { creepBodyConfigName } = args;
        // console.log(creepBodyConfigName);
        return Memory.creepBodyConfig[creepBodyConfigName];
    }
}
