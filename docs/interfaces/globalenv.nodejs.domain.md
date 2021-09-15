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

Defined in: node_modules/@types/node/globals.d.ts:614

___

### addListener

▸ **addListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:619

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

Defined in: node_modules/@types/node/globals.d.ts:616

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

Defined in: node_modules/@types/node/globals.d.ts:579

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:576

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

Defined in: node_modules/@types/node/globals.d.ts:617

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:577

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

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:620

___

### once

▸ **once**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:621

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

Defined in: node_modules/@types/node/globals.d.ts:582

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

Defined in: node_modules/@types/node/globals.d.ts:583

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:578

___

### remove

▸ **remove**(`emitter`: [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [*EventEmitter*](globalenv.nodejs.eventemitter.md) \| [*Timer*](globalenv.nodejs.timer.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:615

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:623

___

### removeListener

▸ **removeListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:622

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

Defined in: node_modules/@types/node/globals.d.ts:613

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*Domain*](globalenv.nodejs.domain.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*Domain*](globalenv.nodejs.domain.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:575
