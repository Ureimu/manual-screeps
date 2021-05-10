[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / WritableStream

# Interface: WritableStream

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).WritableStream

## Hierarchy

- [*EventEmitter*](globalenv.nodejs.eventemitter.md)

  ↳ **WritableStream**

  ↳↳ [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

## Table of contents

### Properties

- [writable](globalenv.nodejs.writablestream.md#writable)

### Methods

- [addListener](globalenv.nodejs.writablestream.md#addlistener)
- [emit](globalenv.nodejs.writablestream.md#emit)
- [end](globalenv.nodejs.writablestream.md#end)
- [eventNames](globalenv.nodejs.writablestream.md#eventnames)
- [getMaxListeners](globalenv.nodejs.writablestream.md#getmaxlisteners)
- [listenerCount](globalenv.nodejs.writablestream.md#listenercount)
- [listeners](globalenv.nodejs.writablestream.md#listeners)
- [off](globalenv.nodejs.writablestream.md#off)
- [on](globalenv.nodejs.writablestream.md#on)
- [once](globalenv.nodejs.writablestream.md#once)
- [prependListener](globalenv.nodejs.writablestream.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.writablestream.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.writablestream.md#rawlisteners)
- [removeAllListeners](globalenv.nodejs.writablestream.md#removealllisteners)
- [removeListener](globalenv.nodejs.writablestream.md#removelistener)
- [setMaxListeners](globalenv.nodejs.writablestream.md#setmaxlisteners)
- [write](globalenv.nodejs.writablestream.md#write)

## Properties

### writable

• **writable**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:491

## Methods

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

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

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:71

___

### end

▸ **end**(`cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:494

▸ **end**(`data`: *string* \| *Uint8Array*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | *string* \| *Uint8Array* |
| `cb?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:495

▸ **end**(`str`: *string*, `encoding?`: BufferEncoding, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | BufferEncoding |
| `cb?` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:496

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

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:65

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:62

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:63

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:74

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

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

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:66

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:64

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*WritableStream*](globalenv.nodejs.writablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*WritableStream*](globalenv.nodejs.writablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:67

___

### write

▸ **write**(`buffer`: *string* \| *Uint8Array*, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:492

▸ **write**(`str`: *string*, `encoding?`: BufferEncoding, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | BufferEncoding |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:493
