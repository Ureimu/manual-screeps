import { ControllerLevels } from "../type";
import { bodyTools } from "../tools";

export function chooseBefittingBody(args: { creepBodyConfigName: string; room: Room }): string {
    const { creepBodyConfigName, room } = args;
    const fullConfig = Memory.creepBodyConfig[creepBodyConfigName];
    if (!fullConfig) {
        throw new Error(`${creepBodyConfigName}对应config不存在`);
    }
    const controllerLevel = room.controller?.level;
    for (let index = Number(controllerLevel); index >= 0; index--) {
        const config = fullConfig[String(index) as ControllerLevels];
        if (config && bodyTools.getEnergyCost(config.body) <= room.energyAvailable) {
            return config.body;
        }
    }
    return "";
}
// TODO 继续完善
