import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";

export function moveCreepBetweenGroup(
    args: Omit<Parameters<typeof SpawnPool.addCreep>[0], "creepName"> &
        Omit<Parameters<typeof CreepGroup.addCreep>[0], "creepName"> & {
            creepNameList: string[];
        }
): string {
    const { creepBody, creepGroupName, priority, roomName, readyCondition, creepNameList } = args;
    const logList: string[] = [];
    CreepGroup.create({ routeName: creepGroupName, creepGroupName });
    creepNameList.forEach(creepName => {
        logList.push(
            SpawnPool.addCreep({
                creepName,
                creepBody,
                priority,
                roomName,
                readyCondition
            }),
            CreepGroup.addCreep({ creepName, creepGroupName })
        );
    });
    return logList.join("\n");
}
