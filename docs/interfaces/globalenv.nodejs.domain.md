[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Domain

# Interface: Domain

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Domain

## Hierarchy

- [*EventEmitter*](globalenv.nodejs.eventemitter.md)

  ↳ **Domain**

## Table of contents

### Methods

- [add](globalenv.nodejs.domain.md#add)
- [addListener](globalenv.nodejs.domain.md#addlistener)
- [bind](globalenv.nodejs.domain.md#bind)
- [emit](globalenv.nodejs.domain.md#emit)
- [eventNames](globalenv.nodejs.domain.md#eventnames)
- [getMaxListeners](globalenv.nodejs.domain.md#getmaxlisteners)
- [intercept](globalenv.nodejs.domain.md#intercept)
- [listenerCount](globalenv.nodejs.domain.md#listenercount)
- [listeners](globalenv.nodejs.domain.md#listeners)
- [off](globalenv.nodejs.domain.md#off)
- [on](globalenv.nodejs.domain.md#on)
- [once](globalenv.nodejs.domain.md#once)
- [prependListener](globalenv.nodejs.domain.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.domain.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.domain.md#rawlisteners)
- [remove](globalenv.nodejs.domain.md#remove)
- [removeAllListeners](globalenv.nodejs.domain.md#removealllisteners)
- [removeListener](globalenv.nodejs.domain.md#removelistener)
- [run](globalenv.nodejs.domain.md#run)
- [setMaxListeners](globalenv.nodejs.domain.md#setmaxlisteners)

## Methods

### add

▸ **add**(`emitter`: [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/domain.d.ts:8

___

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:61

___

### bind

▸ **bind**<T\>(`cb`: T): T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | Function |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | T |

**Returns:** T

Defined in: node_modules/@types/node/domain.d.ts:10

___

### emit

▸ **emit**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `...args` | *any*[] |

**Returns:** *boolean*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:71

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:76

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:68

___

### intercept

▸ **intercept**<T\>(`cb`: T): T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | Function |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | T |

**Returns:** T

Defined in: node_modules/@types/node/domain.d.ts:11

___

### listenerCount

▸ **listenerCount**(`event`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:72

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:69

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:65

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:62

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:63

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:74

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:75

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:70

___

### remove

▸ **remove**(`emitter`: [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/domain.d.ts:9

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:66

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:64

___

### run

▸ **run**<T\>(`fn`: (...`args`: *any*[]) => T, ...`args`: *any*[]): T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: *any*[]) => T |
| `...args` | *any*[] |

**Returns:** T

Defined in: node_modules/@types/node/domain.d.ts:7

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:67
