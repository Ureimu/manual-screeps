import { PluginMemory } from "frame/plugin";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "plugin.tools.analyzer");

export function analyzePlugin(plugin: PluginMemory): void {
    logger.log(plugin.name);
    logger.log(JSON.stringify(plugin).length.toString());
}
