import { ControllerLevels } from "creep/body/form";
import { creepBody } from "creep/body";

export function setBodyConfig(creepBodyConfigName: string, creepBodyConfigList: string[]): string {
    const logList: string[] = [];
    logList.push(creepBody.createConfig({ creepBodyConfigName }));
    for (let index = 0; index < creepBodyConfigList.length; index++) {
        creepBody.setConfig({
            creepBodyConfigName,
            controllerLevel: String(index + 1) as ControllerLevels,
            creepBodyConfig: creepBodyConfigList[index]
        });
    }

    return logList.join("\n");
}
