[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/PriorityQueue/taskPool](../modules/utils_priorityqueue_taskpool.md) / TaskPool

# Class: TaskPool<T\>

[utils/PriorityQueue/taskPool](../modules/utils_priorityqueue_taskpool.md).TaskPool

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*node*](../interfaces/utils_priorityqueue.export_.node.md) |

## Table of contents

### Constructors

- [constructor](utils_priorityqueue_taskpool.taskpool.md#constructor)

### Methods

- [getQueueFromArray](utils_priorityqueue_taskpool.taskpool.md#getqueuefromarray)
- [getQueueFromObject](utils_priorityqueue_taskpool.taskpool.md#getqueuefromobject)
- [initQueue](utils_priorityqueue_taskpool.taskpool.md#initqueue)
- [initQueueFromTaskQueue](utils_priorityqueue_taskpool.taskpool.md#initqueuefromtaskqueue)
- [newQueue](utils_priorityqueue_taskpool.taskpool.md#newqueue)
- [setQueue](utils_priorityqueue_taskpool.taskpool.md#setqueue)
- [setQueueFromTaskQueue](utils_priorityqueue_taskpool.taskpool.md#setqueuefromtaskqueue)
- [transTask](utils_priorityqueue_taskpool.taskpool.md#transtask)

## Constructors

### constructor

\+ **new TaskPool**<T\>(): [*TaskPool*](utils_priorityqueue_taskpool.taskpool.md)<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*node*](../interfaces/utils_priorityqueue.export_.node.md) |

**Returns:** [*TaskPool*](utils_priorityqueue_taskpool.taskpool.md)<T\>

## Methods

### getQueueFromArray

▸ **getQueueFromArray**(`taskPoolMemory`: T[], `towards?`: *boolean*): [*export=*](utils_priorityqueue.export_-1.md)<T\>

将Memory中保存的队列转换为c++队列对象.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `taskPoolMemory` | T[] | - | 存储路径 |
| `towards` | *boolean* | false | - |

**Returns:** [*export=*](utils_priorityqueue.export_-1.md)<T\>

c++队列对象

Defined in: src/utils/PriorityQueue/taskPool.ts:20

___

### getQueueFromObject

▸ **getQueueFromObject**(`wantedTaskQueueName`: *string*, `taskPoolMemory`: [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\>, `towards?`: *boolean*): *undefined* \| [*export=*](utils_priorityqueue.export_-1.md)<T\>

将Memory中保存的队列转换为c++队列对象.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wantedTaskQueueName` | *string* | - | 队列名称 |
| `taskPoolMemory` | [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\> | - | 存储路径 |
| `towards` | *boolean* | false | - |

**Returns:** *undefined* \| [*export=*](utils_priorityqueue.export_-1.md)<T\>

c++队列对象

Defined in: src/utils/PriorityQueue/taskPool.ts:38

___

### initQueue

▸ **initQueue**(`wantedTaskQueueName`: *string*, `taskPoolMemory`: [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\>, `towards?`: *boolean*): [*export=*](utils_priorityqueue.export_-1.md)<T\>

初始化一个队列，如果在taskPoolMemory中有该队列则返回该队列，否则返回一个新队列。

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wantedTaskQueueName` | *string* | - | 队列名称 |
| `taskPoolMemory` | [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\> | - | 存储路径 |
| `towards` | *boolean* | false | - |

**Returns:** [*export=*](utils_priorityqueue.export_-1.md)<T\>

Defined in: src/utils/PriorityQueue/taskPool.ts:107

___

### initQueueFromTaskQueue

▸ **initQueueFromTaskQueue**(`taskQueueMemory`: T[], `towards?`: *boolean*): [*export=*](utils_priorityqueue.export_-1.md)<T\>

从给定的memory中的队列初始化该队列

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `taskQueueMemory` | T[] | - |
| `towards` | *boolean* | false |

**Returns:** [*export=*](utils_priorityqueue.export_-1.md)<T\>

Defined in: src/utils/PriorityQueue/taskPool.ts:128

___

### newQueue

▸ **newQueue**(`towards?`: *boolean*): [*export=*](utils_priorityqueue.export_-1.md)<T\>

新声明一个优先队列。

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `towards` | *boolean* | false |

**Returns:** [*export=*](utils_priorityqueue.export_-1.md)<T\>

一个空的PriorityQueue对象

Defined in: src/utils/PriorityQueue/taskPool.ts:95

___

### setQueue

▸ **setQueue**(`queue`: [*export=*](utils_priorityqueue.export_-1.md)<T\>, `TaskQueueName`: *string*, `taskPoolMemory`: [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\>): T[]

将c++队列对象保存到Memory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queue` | [*export=*](utils_priorityqueue.export_-1.md)<T\> | 要保存的队列 |
| `TaskQueueName` | *string* | 队列名称 |
| `taskPoolMemory` | [*taskPool*](../interfaces/utils_priorityqueue_taskpool.taskpool-1.md)<T\> | 存储路径 |

**Returns:** T[]

Defined in: src/utils/PriorityQueue/taskPool.ts:65

___

### setQueueFromTaskQueue

▸ **setQueueFromTaskQueue**(`queue`: [*export=*](utils_priorityqueue.export_-1.md)<T\>, `taskQueueMemory`: T[]): T[]

从taskQueue初始化PriorityQueue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queue` | [*export=*](utils_priorityqueue.export_-1.md)<T\> | 要保存的队列 |
| `taskQueueMemory` | T[] | 队列存储路径 |

**Returns:** T[]

队列存储路径

Defined in: src/utils/PriorityQueue/taskPool.ts:80

___

### transTask

▸ **transTask**(`queueFrom`: [*export=*](utils_priorityqueue.export_-1.md)<T\>, `queueTo`: [*export=*](utils_priorityqueue.export_-1.md)<T\>): *boolean*

从queueFrom取出元素并交给queueTo

#### Parameters

| Name | Type |
| :------ | :------ |
| `queueFrom` | [*export=*](utils_priorityqueue.export_-1.md)<T\> |
| `queueTo` | [*export=*](utils_priorityqueue.export_-1.md)<T\> |

**Returns:** *boolean*

成功返回true,失败返回false.

Defined in: src/utils/PriorityQueue/taskPool.ts:139
