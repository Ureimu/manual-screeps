[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / ReadableStream

# Interface: ReadableStream

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).ReadableStream

## Hierarchy

- [*EventEmitter*](globalenv.nodejs.eventemitter.md)

  ↳ **ReadableStream**

  ↳↳ [*ReadWriteStream*](globalenv.nodejs.readwritestream.md)

## Table of contents

### Properties

- [readable](globalenv.nodejs.readablestream.md#readable)

### Methods

- [[Symbol.asyncIterator]](globalenv.nodejs.readablestream.md#[symbol.asynciterator])
- [addListener](globalenv.nodejs.readablestream.md#addlistener)
- [emit](globalenv.nodejs.readablestream.md#emit)
- [eventNames](globalenv.nodejs.readablestream.md#eventnames)
- [getMaxListeners](globalenv.nodejs.readablestream.md#getmaxlisteners)
- [isPaused](globalenv.nodejs.readablestream.md#ispaused)
- [listenerCount](globalenv.nodejs.readablestream.md#listenercount)
- [listeners](globalenv.nodejs.readablestream.md#listeners)
- [off](globalenv.nodejs.readablestream.md#off)
- [on](globalenv.nodejs.readablestream.md#on)
- [once](globalenv.nodejs.readablestream.md#once)
- [pause](globalenv.nodejs.readablestream.md#pause)
- [pipe](globalenv.nodejs.readablestream.md#pipe)
- [prependListener](globalenv.nodejs.readablestream.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.readablestream.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.readablestream.md#rawlisteners)
- [read](globalenv.nodejs.readablestream.md#read)
- [removeAllListeners](globalenv.nodejs.readablestream.md#removealllisteners)
- [removeListener](globalenv.nodejs.readablestream.md#removelistener)
- [resume](globalenv.nodejs.readablestream.md#resume)
- [setEncoding](globalenv.nodejs.readablestream.md#setencoding)
- [setMaxListeners](globalenv.nodejs.readablestream.md#setmaxlisteners)
- [unpipe](globalenv.nodejs.readablestream.md#unpipe)
- [unshift](globalenv.nodejs.readablestream.md#unshift)
- [wrap](globalenv.nodejs.readablestream.md#wrap)

## Properties

### readable

• **readable**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:588

## Methods

### [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator*<string \| Buffer\>

**Returns:** *AsyncIterableIterator*<string \| Buffer\>

Defined in: node_modules/@types/node/globals.d.ts:598

___

### addListener

▸ **addListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

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

### isPaused

▸ **isPaused**(): *boolean*

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:593

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

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:570

___

### once

▸ **once**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:571

___

### pause

▸ **pause**(): [*ReadableStream*](globalenv.nodejs.readablestream.md)

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

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

Defined in: node_modules/@types/node/globals.d.ts:594

___

### prependListener

▸ **prependListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:582

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

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

### read

▸ **read**(`size?`: *number*): *string* \| *Buffer*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | *number* |

**Returns:** *string* \| *Buffer*

Defined in: node_modules/@types/node/globals.d.ts:589

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:572

___

### resume

▸ **resume**(): [*ReadableStream*](globalenv.nodejs.readablestream.md)

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:592

___

### setEncoding

▸ **setEncoding**(`encoding`: *string*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | *string* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:590

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/globals.d.ts:575

___

### unpipe

▸ **unpipe**(`destination?`: [*WritableStream*](globalenv.nodejs.writablestream.md)): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [*WritableStream*](globalenv.nodejs.writablestream.md) |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

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

Defined in: node_modules/@types/node/globals.d.ts:596

___

### wrap

▸ **wrap**(`oldStream`: [*ReadableStream*](globalenv.nodejs.readablestream.md)): [*ReadableStream*](globalenv.nodejs.readablestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [*ReadableStream*](globalenv.nodejs.readablestream.md) |

**Returns:** [*ReadableStream*](globalenv.nodejs.readablestream.md)

Defined in: node_modules/@types/node/globals.d.ts:597
