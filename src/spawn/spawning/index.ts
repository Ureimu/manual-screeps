import { chooseBefittingBody } from "creep/body/chooseCondition";
import { bodyTools } from "creep/body/tools";
import { creepGroupCommit } from "creep/group/commit";
import { SpawnCreepDetail } from "spawn/spawnPool";
import { TaskPool } from "utils/PriorityQueue/taskPool";
import { SetTools } from "utils/SetTools";
import { callOnBirth } from "./callOnBirth";
import { readyCondition } from "./readyCondition";

export function runSpawnQueue(spawn: StructureSpawn): void {
    if (spawn.spawning) return;
    if (spawn.room.energyAvailable < BODYPART_COST["carry"] * 6) return;
    if (!spawn.memory.spawnQueue) {
        spawn.memory = {
            spawnQueue: []
        };
    }

    // 执行spawn
    const taskPool = new TaskPool<SpawnCreepDetail>();
    const spawnQueue = taskPool.initQueueFromTaskQueue(spawn.memory.spawnQueue);
    let returnCode = 0;
    const failedList: SpawnCreepDetail[] = [];
    do {
        const spawnTask = spawnQueue.pop();
        if (spawnTask) {
            const creepBody = bodyTools.compile(
                chooseBefittingBody({ creepBodyConfigName: spawnTask.creepBody, spawn })
            );
            returnCode = spawn.spawnCreep(creepBody, spawnTask.creepName, {
                dryRun: true
            });
            if (returnCode === OK) {
                spawn.spawnCreep(creepBody, spawnTask.creepName);
                spawn.room.memory.spawnPool[spawnTask.creepName].state = "notReady";
            } else {
                if (returnCode !== ERR_NOT_ENOUGH_ENERGY && returnCode !== ERR_NAME_EXISTS) {
                    console.log(`spawn:${spawn.name} 返回错误 returnCode: ${returnCode}`);
                }
                if (returnCode === ERR_NO_BODYPART && creepBody === []) {
                    console.log(`spawn:${spawn.name} 返回错误：找不到合适的身体部件数组：${spawnTask.creepName}`);
                }
                failedList.push(spawnTask);
            }
        } else {
            returnCode = OK;
        }
    } while (returnCode);
    failedList.forEach(task => spawnQueue.push(task));
    taskPool.setQueueFromTaskQueue(spawnQueue, spawn.memory.spawnQueue);
}

export function runSpawnPool(room: Room): void {
    if (!room.memory.spawnPool) {
        room.memory.diedCreepList = [];
        room.memory.spawnPool = {};
    }

    // 上个tick的死亡creep名单
    const diedCreepListInLastTick = room.memory.diedCreepList;

    // 维护从属本spawn的diedCreepList
    const diedCreepSet = new Set<string>(room.memory.diedCreepList);
    for (const creepName in room.memory.spawnPool) {
        if (!(creepName in Game.creeps)) {
            diedCreepSet.add(creepName);
        } else {
            diedCreepSet.delete(creepName);
        }
    }
    room.memory.diedCreepList = Array.from(diedCreepSet);
    const diedCreepSetInLastTick = new Set<string>(diedCreepListInLastTick);

    // 对各类型creep进行维护
    const {
        "a-b": justDiedCreepSet, // 上一个tick刚刚死亡的creep
        "b-a": justSpawningCreepSet, // 这一个tick刚刚开始孵化的creep
        "a*b": DiedForPeriodCreepSet // 已经死亡一段时间的creep
    } = SetTools.compareSet(diedCreepSet, diedCreepSetInLastTick, { "a-b": true, "b-a": true, "a*b": true });

    if (justDiedCreepSet?.size) {
        justDiedCreepSet.forEach(creepName => {
            const { groupName } = Memory.creeps[creepName];
            // 死亡重置memory
            creepGroupCommit.addCreep({
                creepGroupName: groupName,
                creepName
            });
        });
    }

    if (justSpawningCreepSet?.size) {
        justSpawningCreepSet.forEach(creepName => {
            const creep = Game.creeps[creepName];
            callOnBirth(creep);
        });
    }

    // 从spawnPool拿出所有ready的task并分别放入不同spawn的spawnQueue
    for (const creepName in room.memory.spawnPool) {
        const detail = room.memory.spawnPool[creepName];
        const readyTaskList: SpawnCreepDetail[] = [];
        switch (detail.state) {
            case "ready":
                if (detail.spawnName) {
                    Game.spawns[detail.spawnName].memory.spawnQueue.push(detail);
                } else {
                    readyTaskList.push(detail);
                }
                room.memory.spawnPool[creepName].state = "running";
                break;
            case "notReady":
                readyCondition[detail.readyCondition](detail);
                break;
            default:
                break;
        }
        let i = 0;
        const spawnList = room.find(FIND_MY_SPAWNS);
        while (readyTaskList.length !== 0) {
            spawnList[i].memory.spawnQueue.push(readyTaskList.pop() as SpawnCreepDetail);
            i = (i + 1) % 3;
        }
    }
}
