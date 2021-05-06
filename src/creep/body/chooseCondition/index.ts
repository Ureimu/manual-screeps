import { ControllerLevels } from "..";
import { bodyTools } from "../tools";

export function chooseBefittingBody(args: { creepBodyConfigName: string; spawn: StructureSpawn }): string {
    const { creepBodyConfigName, spawn } = args;
    const fullConfig = Memory.creepBodyConfig[creepBodyConfigName];
    const controllerLevel = spawn.room.controller?.level;
    for (let index = Number(controllerLevel); index > 0; index--) {
        const config = fullConfig[String(index) as ControllerLevels];
        if (config && bodyTools.getEnergyCost(config.body) <= spawn.room.energyCapacityAvailable) {
            return config.body;
        }
    }
    return "";
}
// TODO 继续完善