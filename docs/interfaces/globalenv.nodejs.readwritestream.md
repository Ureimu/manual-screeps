[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / ReadWriteStream

# Interface: ReadWriteStream

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).ReadWriteStream

## Hierarchy

- [*ReadableStream*](globalenv.nodejs.readablestream.md)

- [*WritableStream*](globalenv.nodejs.writablestream.md)

  ↳ **ReadWriteStream**

  ↳↳ [*Socket*](globalenv.nodejs.socket.md)

## Table of contents

### Properties

- [readable](globalenv.nodejs.readwritestream.md#readable)
- [writable](globalenv.nodejs.readwritestream.md#writable)

### Methods

- [[Symbol.asyncIterator]](globalenv.nodejs.readwritestream.md#[symbol.asynciterator])
- [addListener](globalenv.nodejs.readwritestream.md#addlistener)
- [emit](globalenv.nodejs.readwritestream.md#emit)
- [end](globalenv.nodejs.readwritestream.md#end)
- [eventNames](globalenv.nodejs.readwritestream.md#eventnames)
- [getMaxListeners](globalenv.nodejs.readwritestream.md#getmaxlisteners)
- [isPaused](globalenv.nodejs.readwritestream.md#ispaused)
- [listenerCount](globalenv.nodejs.readwritestream.md#listenercount)
- [listeners](globalenv.nodejs.readwritestream.md#listeners)
- [off](globalenv.nodejs.readwritestream.md#off)
- [on](globalenv.nodejs.readwritestream.md#on)
- [once](globalenv.nodejs.readwritestream.md#once)
- [pause](globalenv.nodejs.readwritestream.md#pause)
- [pipe](globalenv.nodejs.readwritestream.md#pipe)
- [prependListener](globalenv.nodejs.readwritestream.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.readwritestream.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.readwritestream.md#rawlisteners)
- [read](globalenv.nodejs.readwritestream.md#read)
- [removeAllListeners](globalenv.nodejs.readwritestream.md#removealllisteners)
- [removeListener](globalenv.nodejs.readwritestream.md#removelistener)
- [resume](globalenv.nodejs.readwritestream.md#resume)
- [setEncoding](globalenv.nodejs.readwritestream.md#setencoding)
- [setMaxListeners](globalenv.nodejs.readwritestream.md#setmaxlisteners)
- [unpipe](globalenv.nodejs.readwritestream.md#unpipe)
- [unshift](globalenv.nodejs.readwritestream.md#unshift)
- [wrap](globalenv.nodejs.readwritestream.md#wrap)
- [write](globalenv.nodejs.readwritestream.md#write)

## Properties

### readable

• **readable**: *boolean*

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md).[readable](globalenv.nodejs.readablestream.md#readable)

Defined in: node_modules/@types/node/globals.d.ts:588

___

### writable

• **writable**: *boolean*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md).[writable](globalenv.nodejs.writablestream.md#writable)

Defined in: node_modules/@types/node/globals.d.ts:602

## Methods

### [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator*<string \| Buffer\>

**Returns:** *AsyncIterableIterator*<string \| Buffer\>

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:598

___

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

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

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:579

___

### end

▸ **end**(`cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:605

▸ **end**(`data`: *string* \| *Uint8Array*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | *string* \| *Uint8Array* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:606

▸ **end**(`str`: *string*, `encoding?`: *string*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | *string* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:607

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:576

___

### isPaused

▸ **isPaused**(): *boolean*

**Returns:** *boolean*

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:593

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:577

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:570

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:571

___

### pause

▸ **pause**(): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:591

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

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:594

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:582

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:583

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:578

___

### read

▸ **read**(`size?`: *number*): *string* \| *Buffer*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | *number* |

**Returns:** *string* \| *Buffer*

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:589

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:572

___

### resume

▸ **resume**(): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:592

___

### setEncoding

▸ **setEncoding**(`encoding`: *string*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | *string* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:590

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:575

___

### unpipe

▸ **unpipe**(`destination?`: [*WritableStream*](globalenv.nodejs.writablestream.md)): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [*WritableStream*](globalenv.nodejs.writablestream.md) |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:595

___

### unshift

▸ **unshift**(`chunk`: *string* \| *Uint8Array*, `encoding?`: BufferEncoding): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *string* \| *Uint8Array* |
| `encoding?` | BufferEncoding |

**Returns:** *void*

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:596

___

### wrap

▸ **wrap**(`oldStream`: [*ReadableStream*](globalenv.nodejs.readablestream.md)): [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [*ReadableStream*](globalenv.nodejs.readablestream.md) |

**Returns:** [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

Inherited from: [ReadableStream](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:597

___

### write

▸ **write**(`buffer`: *string* \| *Uint8Array*, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:603

▸ **write**(`str`: *string*, `encoding?`: *string*, `cb?`: (`err?`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `encoding?` | *string* |
| `cb?` | (`err?`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Inherited from: [WritableStream](globalenv.nodejs.writablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:604
