import { creepGroupCommit } from "creep/group/commit";
import { spawnPoolCommit } from "spawn/spawnPool/commit";

export function createCreepGroup(
    args: Omit<Parameters<typeof spawnPoolCommit.addCreep>[0], "creepName"> &
        Omit<Parameters<typeof creepGroupCommit.addCreep>[0], "creepName"> & {
            creepNameList: string[];
            routeName: string;
        }
): string {
    const { creepBody, creepGroupName, priority, roomName, readyCondition, creepNameList, routeName } = args;
    const logList: string[] = [];
    creepGroupCommit.create({ routeName, creepGroupName });
    creepNameList.forEach(creepName => {
        logList.push(
            ...[
                spawnPoolCommit.addCreep({
                    creepName,
                    creepBody,
                    priority,
                    roomName,
                    readyCondition
                }),
                creepGroupCommit.addCreep({ creepName, creepGroupName })
            ]
        );
    });
    return logList.join("\n");
}
