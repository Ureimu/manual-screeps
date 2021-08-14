import { PluginMemory } from "frame/plugin";

export function analyzePlugin(plugin: PluginMemory): void {
    console.log(plugin.name);
    console.log(JSON.stringify(plugin).length);
}
