import { creepGroup } from "creep/group";
import { spawnPool } from "spawn/spawnPool";

export function moveCreepBetweenGroup(
    args: Omit<Parameters<typeof spawnPool.addCreep>[0], "creepName"> &
        Omit<Parameters<typeof creepGroup.addCreep>[0], "creepName"> & {
            creepNameList: string[];
        }
): string {
    const { creepBody, creepGroupName, priority, roomName, readyCondition, creepNameList } = args;
    const logList: string[] = [];
    creepGroup.create({ routeName: creepGroupName, creepGroupName });
    creepNameList.forEach(creepName => {
        logList.push(
            spawnPool.addCreep({
                creepName,
                creepBody,
                priority,
                roomName,
                readyCondition
            }),
            creepGroup.addCreep({ creepName, creepGroupName })
        );
    });
    return logList.join("\n");
}
