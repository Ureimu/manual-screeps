[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/PriorityQueue](../modules/utils_priorityqueue.md) / export%3D

# Class: export=<T\>

[utils/PriorityQueue](../modules/utils_priorityqueue.md).export=

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*node*](../interfaces/utils_priorityqueue.export_.node.md) |

## Table of contents

### Constructors

- [constructor](utils_priorityqueue.export_-1.md#constructor)

### Methods

- [clear](utils_priorityqueue.export_-1.md#clear)
- [isEmpty](utils_priorityqueue.export_-1.md#isempty)
- [pop](utils_priorityqueue.export_-1.md#pop)
- [push](utils_priorityqueue.export_-1.md#push)
- [size](utils_priorityqueue.export_-1.md#size)
- [top](utils_priorityqueue.export_-1.md#top)

## Constructors

### constructor

\+ **new export=**<T\>(`isMinRoot`: *boolean*): [*export=*](utils_priorityqueue.export_-1.md)<T\>

创建一个PriorityQueue实例.

**`memberof`** PriorityQueue

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*node*](../interfaces/utils_priorityqueue.export_.node.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isMinRoot` | *boolean* | 优先级方向，true则pop()时得到数字最小的，否则pop()出最大的。 |

**Returns:** [*export=*](utils_priorityqueue.export_-1.md)<T\>

Defined in: src/utils/PriorityQueue/index.d.ts:5

## Methods

### clear

▸ **clear**(): *void*

清空整个队列

**`memberof`** PriorityQueue

**Returns:** *void*

Defined in: src/utils/PriorityQueue/index.d.ts:47

___

### isEmpty

▸ **isEmpty**(): *boolean*

队列是否为空。

**`memberof`** PriorityQueue

**Returns:** *boolean*

空返回true,不空返回false

Defined in: src/utils/PriorityQueue/index.d.ts:54

___

### pop

▸ **pop**(): *undefined* \| T

取出顶端节点，空队列返回undefined

**`memberof`** PriorityQueue

**Returns:** *undefined* \| T

Defined in: src/utils/PriorityQueue/index.d.ts:34

___

### push

▸ **push**(`node`: T): T

把节点插入队列

**`memberof`** PriorityQueue

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | T |

**Returns:** T

T

Defined in: src/utils/PriorityQueue/index.d.ts:20

___

### size

▸ **size**(): *number*

队列元素个数

**`memberof`** PriorityQueue

**Returns:** *number*

Defined in: src/utils/PriorityQueue/index.d.ts:41

___

### top

▸ **top**(): *undefined* \| T

查看顶端节点，空队列返回undefined

**`memberof`** PriorityQueue

**Returns:** *undefined* \| T

Defined in: src/utils/PriorityQueue/index.d.ts:27
