import { PluginMemory } from "frame/plugin";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "plugin.tools.loader");

export function loadPlugin(originStr: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const plugin: PluginMemory = JSON.parse(originStr);
    logger.log(`加载插件${plugin.name} ${plugin.version.plugin} 成功`);
    Memory.plugin[plugin.name] = plugin;
    return plugin.version.plugin;
}
