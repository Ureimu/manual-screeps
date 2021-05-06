import { ControllerLevels } from "creep/body";
import { creepBodyCommit } from "creep/body/commit";

export function setBodyConfig(creepBodyConfigName: string, creepBodyConfigList: string[]): string {
    const logList: string[] = [];
    logList.push(creepBodyCommit.createConfig({ creepBodyConfigName }));
    for (let index = 0; index < creepBodyConfigList.length; index++) {
        creepBodyCommit.setConfig({
            creepBodyConfigName,
            controllerLevel: String(index + 1) as ControllerLevels,
            creepBodyConfig: creepBodyConfigList[index]
        });
    }

    return logList.join("\n");
}
