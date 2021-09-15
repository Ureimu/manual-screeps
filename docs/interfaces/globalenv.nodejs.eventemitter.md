[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / EventEmitter

# Interface: EventEmitter

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).EventEmitter

## Hierarchy

- **EventEmitter**

  ↳ [*ReadableStream*](globalenv.nodejs.readablestream.md)

  ↳ [*WritableStream*](globalenv.nodejs.writablestream.md)

  ↳ [*Domain*](globalenv.nodejs.domain.md)

  ↳ [*Process*](globalenv.nodejs.process.md)

## Table of contents

### Methods

- [addListener](globalenv.nodejs.eventemitter.md#addlistener)
- [emit](globalenv.nodejs.eventemitter.md#emit)
- [eventNames](globalenv.nodejs.eventemitter.md#eventnames)
- [getMaxListeners](globalenv.nodejs.eventemitter.md#getmaxlisteners)
- [listenerCount](globalenv.nodejs.eventemitter.md#listenercount)
- [listeners](globalenv.nodejs.eventemitter.md#listeners)
- [off](globalenv.nodejs.eventemitter.md#off)
- [on](globalenv.nodejs.eventemitter.md#on)
- [once](globalenv.nodejs.eventemitter.md#once)
- [prependListener](globalenv.nodejs.eventemitter.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.eventemitter.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.eventemitter.md#rawlisteners)
- [removeAllListeners](globalenv.nodejs.eventemitter.md#removealllisteners)
- [removeListener](globalenv.nodejs.eventemitter.md#removelistener)
- [setMaxListeners](globalenv.nodejs.eventemitter.md#setmaxlisteners)

## Methods

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:569

___

### emit

▸ **emit**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `...args` | *any*[] |

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:579

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Defined in: node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/globals.d.ts:576

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |

**Returns:** *number*

Defined in: node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Defined in: node_modules/@types/node/globals.d.ts:577

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:570

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:571

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:582

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:583

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Defined in: node_modules/@types/node/globals.d.ts:578

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:572

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:575
