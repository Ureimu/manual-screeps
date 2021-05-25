import { ControllerLevels } from "creep/body/type";
import { CreepBody } from "creep/body";

export function setBodyConfig(creepBodyConfigName: string, creepBodyConfigList: string[]): string {
    const logList: string[] = [];
    logList.push(CreepBody.createConfig({ creepBodyConfigName }));
    for (let index = 0; index < creepBodyConfigList.length; index++) {
        CreepBody.setConfig({
            creepBodyConfigName,
            controllerLevel: String(index + 1) as ControllerLevels,
            creepBodyConfig: creepBodyConfigList[index]
        });
    }

    return logList.join("\n");
}
