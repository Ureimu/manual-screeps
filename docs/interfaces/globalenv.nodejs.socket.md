[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Socket

# Interface: Socket

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Socket

## Hierarchy

- [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

  ↳ **Socket**

## Table of contents

### Properties

- [isTTY](globalenv.nodejs.socket.md#istty)
- [readable](globalenv.nodejs.socket.md#readable)
- [writable](globalenv.nodejs.socket.md#writable)

### Methods

- [[Symbol.asyncIterator]](globalenv.nodejs.socket.md#[symbol.asynciterator])
- [addListener](globalenv.nodejs.socket.md#addlistener)
- [emit](globalenv.nodejs.socket.md#emit)
- [end](globalenv.nodejs.socket.md#end)
- [eventNames](globalenv.nodejs.socket.md#eventnames)
- [getMaxListeners](globalenv.nodejs.socket.md#getmaxlisteners)
- [isPaused](globalenv.nodejs.socket.md#ispaused)
- [listenerCount](globalenv.nodejs.socket.md#listenercount)
- [listeners](globalenv.nodejs.socket.md#listeners)
- [off](globalenv.nodejs.socket.md#off)
- [on](globalenv.nodejs.socket.md#on)
- [once](globalenv.nodejs.socket.md#once)
- [pause](globalenv.nodejs.socket.md#pause)
- [pipe](globalenv.nodejs.socket.md#pipe)
- [prependListener](globalenv.nodejs.socket.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.socket.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.socket.md#rawlisteners)
- [read](globalenv.nodejs.socket.md#read)
- [removeAllListeners](globalenv.nodejs.socket.md#removealllisteners)
- [removeListener](globalenv.nodejs.socket.md#removelistener)
- [resume](globalenv.nodejs.socket.md#resume)
- [setEncoding](globalenv.nodejs.socket.md#setencoding)
- [setMaxListeners](globalenv.nodejs.socket.md#setmaxlisteners)
- [unpipe](globalenv.nodejs.socket.md#unpipe)
- [unshift](globalenv.nodejs.socket.md#unshift)
- [wrap](globalenv.nodejs.socket.md#wrap)
- [write](globalenv.nodejs.socket.md#write)

## Properties

### isTTY

• `Optional` **isTTY**: ``true``

Defined in: node_modules/@types/node/process.d.ts:79

___

### readable

• **readable**: *boolean*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md).[readable](globalenv.nodejs.readwritestream.md#readable)

Defined in: node_modules/@types/node/globals.d.ts:477

___

### writable

• **writable**: *boolean*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md).[writable](globalenv.nodejs.readwritestream.md#writable)

Defined in: node_modules/@types/node/globals.d.ts:491

## Methods

### [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator*<string \| Buffer\>

**Returns:** *AsyncIterableIterator*<string \| Buffer\>

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:487

___

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

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

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:71

___

### end

▸ **end**(`cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:494

▸ **end**(`data`: *string* \| *Uint8Array*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | *string* \| *Uint8Array* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:495

▸ **end**(`str`: *string*, `encoding?`: BufferEncoding, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | BufferEncoding |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:496

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:76

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:68

___

### isPaused

▸ **isPaused**(): *boolean*

**Returns:** *boolean*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:482

___

### listenerCount

▸ **listenerCount**(`event`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:72

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:69

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:65

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:62

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:63

___

### pause

▸ **pause**(): [*Socket*](globalenv.nodejs.socket.md)

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:480

___

### pipe

▸ **pipe**<T\>(`destination`: T, `options?`: { `end?`: *boolean*  }): T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*WritableStream*](globalenv.nodejs.writablestream.md)<T\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | T |
| `options?` | *object* |
| `options.end?` | *boolean* |

**Returns:** T

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:483

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:74

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:75

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:70

___

### read

▸ **read**(`size?`: *number*): *string* \| *Buffer*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | *number* |

**Returns:** *string* \| *Buffer*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:478

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:66

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:64

___

### resume

▸ **resume**(): [*Socket*](globalenv.nodejs.socket.md)

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:481

___

### setEncoding

▸ **setEncoding**(`encoding`: BufferEncoding): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | BufferEncoding |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:479

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/events.d.ts:67

___

### unpipe

▸ **unpipe**(`destination?`: [*WritableStream*](globalenv.nodejs.writablestream.md)): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [*WritableStream*](globalenv.nodejs.writablestream.md) |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:484

___

### unshift

▸ **unshift**(`chunk`: *string* \| *Uint8Array*, `encoding?`: BufferEncoding): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *string* \| *Uint8Array* |
| `encoding?` | BufferEncoding |

**Returns:** *void*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:485

___

### wrap

▸ **wrap**(`oldStream`: [*ReadableStream*](globalenv.nodejs.readablestream.md)): [*Socket*](globalenv.nodejs.socket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [*ReadableStream*](globalenv.nodejs.readablestream.md) |

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:486

___

### write

▸ **write**(`buffer`: *string* \| *Uint8Array*, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:492

▸ **write**(`str`: *string*, `encoding?`: BufferEncoding, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | BufferEncoding |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Inherited from: [ReadWriteStream](globalenv.nodejs.readwritestream.md)

Defined in: node_modules/@types/node/globals.d.ts:493
