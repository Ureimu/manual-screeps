# PriorityQueue
**v1.1.1 by Scorpior**

Type Definitions by: Ureimu

taskPool written by: Ureimu

使用taskPool来快速使用优先队列并获得健全的类型提示。

```ts
// 执行spawn
const taskPool = new TaskPool<SpawnCreepDetail>();
const spawnQueue = taskPool.initQueueFromTaskQueue(spawn.memory.spawnQueue);
let returnCode = 0;
const failedList: SpawnCreepDetail[] = [];
do {
    const spawnTask = spawnQueue.pop();
    if (spawnTask) {
        //spawn执行任务，不成功的放回failedList
    } else {
        returnCode = OK;
    }
} while (returnCode);
failedList.forEach(task => spawnQueue.push(task));
taskPool.setQueueFromTaskQueue(spawnQueue, spawn.memory.spawnQueue);
```
