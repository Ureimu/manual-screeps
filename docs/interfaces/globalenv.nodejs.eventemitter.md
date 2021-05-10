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

Defined in: node_modules/@types/node/events.d.ts:61

___

### emit

▸ **emit**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `...args` | *any*[] |

**Returns:** *boolean*

Defined in: node_modules/@types/node/events.d.ts:71

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Defined in: node_modules/@types/node/events.d.ts:76

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/events.d.ts:68

___

### listenerCount

▸ **listenerCount**(`event`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** *number*

Defined in: node_modules/@types/node/events.d.ts:72

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Defined in: node_modules/@types/node/events.d.ts:69

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:65

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:62

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:63

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:74

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:75

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Defined in: node_modules/@types/node/events.d.ts:70

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:66

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:64

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*EventEmitter*](globalenv.nodejs.eventemitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*EventEmitter*](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:67
