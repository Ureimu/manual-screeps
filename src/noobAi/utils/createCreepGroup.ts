import { CreepGroup } from "creep/group";
import { SpawnPool } from "spawn/spawnPool";

export function createCreepGroup(
    args: Omit<Parameters<typeof SpawnPool.addCreep>[0], "creepName"> &
        Omit<Parameters<typeof CreepGroup.addCreep>[0], "creepName"> & {
            creepNameList: string[];
            routeName: string;
        }
): string {
    const { creepBody, creepGroupName, priority, roomName, readyCondition, creepNameList, routeName } = args;
    const logList: string[] = [];
    CreepGroup.create({ creepGroupName, mode: "route" });
    creepNameList.forEach(creepName => {
        logList.push(
            ...[
                SpawnPool.addCreep({
                    creepName,
                    creepBody,
                    priority,
                    roomName,
                    readyCondition
                }),
                CreepGroup.addCreep({ creepName, creepGroupName })
            ]
        );
    });
    return logList.join("\n");
}
