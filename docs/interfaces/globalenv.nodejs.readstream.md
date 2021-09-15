[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / ReadStream

# Interface: ReadStream

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).ReadStream

## Hierarchy

- *ReadStream*

  ↳ **ReadStream**

## Table of contents

### Properties

- [bufferSize](globalenv.nodejs.readstream.md#buffersize)
- [bytesRead](globalenv.nodejs.readstream.md#bytesread)
- [bytesWritten](globalenv.nodejs.readstream.md#byteswritten)
- [connecting](globalenv.nodejs.readstream.md#connecting)
- [destroyed](globalenv.nodejs.readstream.md#destroyed)
- [isRaw](globalenv.nodejs.readstream.md#israw)
- [isTTY](globalenv.nodejs.readstream.md#istty)
- [localAddress](globalenv.nodejs.readstream.md#localaddress)
- [localPort](globalenv.nodejs.readstream.md#localport)
- [readable](globalenv.nodejs.readstream.md#readable)
- [readableEncoding](globalenv.nodejs.readstream.md#readableencoding)
- [readableEnded](globalenv.nodejs.readstream.md#readableended)
- [readableFlowing](globalenv.nodejs.readstream.md#readableflowing)
- [readableHighWaterMark](globalenv.nodejs.readstream.md#readablehighwatermark)
- [readableLength](globalenv.nodejs.readstream.md#readablelength)
- [readableObjectMode](globalenv.nodejs.readstream.md#readableobjectmode)
- [remoteAddress](globalenv.nodejs.readstream.md#remoteaddress)
- [remoteFamily](globalenv.nodejs.readstream.md#remotefamily)
- [remotePort](globalenv.nodejs.readstream.md#remoteport)
- [writable](globalenv.nodejs.readstream.md#writable)
- [writableCorked](globalenv.nodejs.readstream.md#writablecorked)
- [writableEnded](globalenv.nodejs.readstream.md#writableended)
- [writableFinished](globalenv.nodejs.readstream.md#writablefinished)
- [writableHighWaterMark](globalenv.nodejs.readstream.md#writablehighwatermark)
- [writableLength](globalenv.nodejs.readstream.md#writablelength)
- [writableObjectMode](globalenv.nodejs.readstream.md#writableobjectmode)

### Methods

- [[Symbol.asyncIterator]](globalenv.nodejs.readstream.md#[symbol.asynciterator])
- [\_destroy](globalenv.nodejs.readstream.md#_destroy)
- [\_final](globalenv.nodejs.readstream.md#_final)
- [\_read](globalenv.nodejs.readstream.md#_read)
- [\_write](globalenv.nodejs.readstream.md#_write)
- [\_writev](globalenv.nodejs.readstream.md#_writev)
- [addListener](globalenv.nodejs.readstream.md#addlistener)
- [address](globalenv.nodejs.readstream.md#address)
- [connect](globalenv.nodejs.readstream.md#connect)
- [cork](globalenv.nodejs.readstream.md#cork)
- [destroy](globalenv.nodejs.readstream.md#destroy)
- [emit](globalenv.nodejs.readstream.md#emit)
- [end](globalenv.nodejs.readstream.md#end)
- [eventNames](globalenv.nodejs.readstream.md#eventnames)
- [getMaxListeners](globalenv.nodejs.readstream.md#getmaxlisteners)
- [isPaused](globalenv.nodejs.readstream.md#ispaused)
- [listenerCount](globalenv.nodejs.readstream.md#listenercount)
- [listeners](globalenv.nodejs.readstream.md#listeners)
- [off](globalenv.nodejs.readstream.md#off)
- [on](globalenv.nodejs.readstream.md#on)
- [once](globalenv.nodejs.readstream.md#once)
- [pause](globalenv.nodejs.readstream.md#pause)
- [pipe](globalenv.nodejs.readstream.md#pipe)
- [prependListener](globalenv.nodejs.readstream.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.readstream.md#prependoncelistener)
- [push](globalenv.nodejs.readstream.md#push)
- [rawListeners](globalenv.nodejs.readstream.md#rawlisteners)
- [read](globalenv.nodejs.readstream.md#read)
- [ref](globalenv.nodejs.readstream.md#ref)
- [removeAllListeners](globalenv.nodejs.readstream.md#removealllisteners)
- [removeListener](globalenv.nodejs.readstream.md#removelistener)
- [resume](globalenv.nodejs.readstream.md#resume)
- [setDefaultEncoding](globalenv.nodejs.readstream.md#setdefaultencoding)
- [setEncoding](globalenv.nodejs.readstream.md#setencoding)
- [setKeepAlive](globalenv.nodejs.readstream.md#setkeepalive)
- [setMaxListeners](globalenv.nodejs.readstream.md#setmaxlisteners)
- [setNoDelay](globalenv.nodejs.readstream.md#setnodelay)
- [setRawMode](globalenv.nodejs.readstream.md#setrawmode)
- [setTimeout](globalenv.nodejs.readstream.md#settimeout)
- [uncork](globalenv.nodejs.readstream.md#uncork)
- [unpipe](globalenv.nodejs.readstream.md#unpipe)
- [unref](globalenv.nodejs.readstream.md#unref)
- [unshift](globalenv.nodejs.readstream.md#unshift)
- [wrap](globalenv.nodejs.readstream.md#wrap)
- [write](globalenv.nodejs.readstream.md#write)

## Properties

### bufferSize

• `Readonly` **bufferSize**: *number*

Inherited from: tty.ReadStream.bufferSize

Defined in: node_modules/@types/node/net.d.ts:78

___

### bytesRead

• `Readonly` **bytesRead**: *number*

Inherited from: tty.ReadStream.bytesRead

Defined in: node_modules/@types/node/net.d.ts:79

___

### bytesWritten

• `Readonly` **bytesWritten**: *number*

Inherited from: tty.ReadStream.bytesWritten

Defined in: node_modules/@types/node/net.d.ts:80

___

### connecting

• `Readonly` **connecting**: *boolean*

Inherited from: tty.ReadStream.connecting

Defined in: node_modules/@types/node/net.d.ts:81

___

### destroyed

• `Readonly` **destroyed**: *boolean*

Inherited from: tty.ReadStream.destroyed

Defined in: node_modules/@types/node/net.d.ts:82

___

### isRaw

• **isRaw**: *boolean*

Inherited from: tty.ReadStream.isRaw

Defined in: node_modules/@types/node/tty.d.ts:7

___

### isTTY

• **isTTY**: *boolean*

Inherited from: tty.ReadStream.isTTY

Defined in: node_modules/@types/node/tty.d.ts:9

___

### localAddress

• `Readonly` **localAddress**: *string*

Inherited from: tty.ReadStream.localAddress

Defined in: node_modules/@types/node/net.d.ts:83

___

### localPort

• `Readonly` **localPort**: *number*

Inherited from: tty.ReadStream.localPort

Defined in: node_modules/@types/node/net.d.ts:84

___

### readable

• **readable**: *boolean*

Inherited from: tty.ReadStream.readable

Defined in: node_modules/@types/node/stream.d.ts:28

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| BufferEncoding

Inherited from: tty.ReadStream.readableEncoding

Defined in: node_modules/@types/node/stream.d.ts:29

___

### readableEnded

• `Readonly` **readableEnded**: *boolean*

Inherited from: tty.ReadStream.readableEnded

Defined in: node_modules/@types/node/stream.d.ts:30

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| *boolean*

Inherited from: tty.ReadStream.readableFlowing

Defined in: node_modules/@types/node/stream.d.ts:31

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: *number*

Inherited from: tty.ReadStream.readableHighWaterMark

Defined in: node_modules/@types/node/stream.d.ts:32

___

### readableLength

• `Readonly` **readableLength**: *number*

Inherited from: tty.ReadStream.readableLength

Defined in: node_modules/@types/node/stream.d.ts:33

___

### readableObjectMode

• `Readonly` **readableObjectMode**: *boolean*

Inherited from: tty.ReadStream.readableObjectMode

Defined in: node_modules/@types/node/stream.d.ts:34

___

### remoteAddress

• `Optional` `Readonly` **remoteAddress**: *string*

Inherited from: tty.ReadStream.remoteAddress

Defined in: node_modules/@types/node/net.d.ts:85

___

### remoteFamily

• `Optional` `Readonly` **remoteFamily**: *string*

Inherited from: tty.ReadStream.remoteFamily

Defined in: node_modules/@types/node/net.d.ts:86

___

### remotePort

• `Optional` `Readonly` **remotePort**: *number*

Inherited from: tty.ReadStream.remotePort

Defined in: node_modules/@types/node/net.d.ts:87

___

### writable

• `Readonly` **writable**: *boolean*

Inherited from: tty.ReadStream.writable

Defined in: node_modules/@types/node/stream.d.ts:247

___

### writableCorked

• `Readonly` **writableCorked**: *number*

Inherited from: tty.ReadStream.writableCorked

Defined in: node_modules/@types/node/stream.d.ts:253

___

### writableEnded

• `Readonly` **writableEnded**: *boolean*

Inherited from: tty.ReadStream.writableEnded

Defined in: node_modules/@types/node/stream.d.ts:248

___

### writableFinished

• `Readonly` **writableFinished**: *boolean*

Inherited from: tty.ReadStream.writableFinished

Defined in: node_modules/@types/node/stream.d.ts:249

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: *number*

Inherited from: tty.ReadStream.writableHighWaterMark

Defined in: node_modules/@types/node/stream.d.ts:250

___

### writableLength

• `Readonly` **writableLength**: *number*

Inherited from: tty.ReadStream.writableLength

Defined in: node_modules/@types/node/stream.d.ts:251

___

### writableObjectMode

• `Readonly` **writableObjectMode**: *boolean*

Inherited from: tty.ReadStream.writableObjectMode

Defined in: node_modules/@types/node/stream.d.ts:252

## Methods

### [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator*<any\>

**Returns:** *AsyncIterableIterator*<any\>

Inherited from: tty.ReadStream.\_\_@asyncIterator

Defined in: node_modules/@types/node/stream.d.ts:124

___

### \_destroy

▸ **_destroy**(`error`: ``null`` \| Error, `callback`: (`error`: ``null`` \| Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| Error |
| `callback` | (`error`: ``null`` \| Error) => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.\_destroy

Defined in: node_modules/@types/node/stream.d.ts:257

___

### \_final

▸ **_final**(`callback`: (`error?`: ``null`` \| Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| Error) => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.\_final

Defined in: node_modules/@types/node/stream.d.ts:258

___

### \_read

▸ **_read**(`size`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | *number* |

**Returns:** *void*

Inherited from: tty.ReadStream.\_read

Defined in: node_modules/@types/node/stream.d.ts:37

___

### \_write

▸ **_write**(`chunk`: *any*, `encoding`: *string*, `callback`: (`error?`: ``null`` \| Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *any* |
| `encoding` | *string* |
| `callback` | (`error?`: ``null`` \| Error) => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.\_write

Defined in: node_modules/@types/node/stream.d.ts:255

___

### \_writev

▸ `Optional` **_writev**(`chunks`: { `chunk`: *any* ; `encoding`: *string*  }[], `callback`: (`error?`: ``null`` \| Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunks` | { `chunk`: *any* ; `encoding`: *string*  }[] |
| `callback` | (`error?`: ``null`` \| Error) => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.\_writev

Defined in: node_modules/@types/node/stream.d.ts:256

___

### addListener

▸ **addListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

events.EventEmitter
  1. close
  2. connect
  3. data
  4. drain
  5. end
  6. error
  7. lookup
  8. timeout

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:105

▸ **addListener**(`event`: ``"close"``, `listener`: (`had_error`: *boolean*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`had_error`: *boolean*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:106

▸ **addListener**(`event`: ``"connect"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:107

▸ **addListener**(`event`: ``"data"``, `listener`: (`data`: *Buffer*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`data`: *Buffer*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:108

▸ **addListener**(`event`: ``"drain"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:109

▸ **addListener**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:110

▸ **addListener**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:111

▸ **addListener**(`event`: ``"lookup"``, `listener`: (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `listener` | (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:112

▸ **addListener**(`event`: ``"timeout"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.addListener

Defined in: node_modules/@types/node/net.d.ts:113

___

### address

▸ **address**(): *string* \| AddressInfo

**Returns:** *string* \| AddressInfo

Inherited from: tty.ReadStream.address

Defined in: node_modules/@types/node/net.d.ts:74

___

### connect

▸ **connect**(`options`: SocketConnectOpts, `connectionListener?`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | SocketConnectOpts |
| `connectionListener?` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.connect

Defined in: node_modules/@types/node/net.d.ts:63

▸ **connect**(`port`: *number*, `host`: *string*, `connectionListener?`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | *number* |
| `host` | *string* |
| `connectionListener?` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.connect

Defined in: node_modules/@types/node/net.d.ts:64

▸ **connect**(`port`: *number*, `connectionListener?`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | *number* |
| `connectionListener?` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.connect

Defined in: node_modules/@types/node/net.d.ts:65

▸ **connect**(`path`: *string*, `connectionListener?`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | *string* |
| `connectionListener?` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.connect

Defined in: node_modules/@types/node/net.d.ts:66

___

### cork

▸ **cork**(): *void*

**Returns:** *void*

Inherited from: tty.ReadStream.cork

Defined in: node_modules/@types/node/stream.d.ts:265

___

### destroy

▸ **destroy**(`error?`: Error): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | Error |

**Returns:** *void*

Inherited from: tty.ReadStream.destroy

Defined in: node_modules/@types/node/stream.d.ts:48

___

### emit

▸ **emit**(`event`: *string* \| *symbol*, ...`args`: *any*[]): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `...args` | *any*[] |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:115

▸ **emit**(`event`: ``"close"``, `had_error`: *boolean*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `had_error` | *boolean* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:116

▸ **emit**(`event`: ``"connect"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:117

▸ **emit**(`event`: ``"data"``, `data`: *Buffer*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `data` | *Buffer* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:118

▸ **emit**(`event`: ``"drain"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:119

▸ **emit**(`event`: ``"end"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:120

▸ **emit**(`event`: ``"error"``, `err`: Error): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | Error |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:121

▸ **emit**(`event`: ``"lookup"``, `err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `err` | Error |
| `address` | *string* |
| `family` | *string* \| *number* |
| `host` | *string* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:122

▸ **emit**(`event`: ``"timeout"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |

**Returns:** *boolean*

Inherited from: tty.ReadStream.emit

Defined in: node_modules/@types/node/net.d.ts:123

___

### end

▸ **end**(`cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.end

Defined in: node_modules/@types/node/net.d.ts:90

▸ **end**(`buffer`: *string* \| *Uint8Array*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.end

Defined in: node_modules/@types/node/net.d.ts:91

▸ **end**(`str`: *string* \| *Uint8Array*, `encoding?`: *string*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* \| *Uint8Array* |
| `encoding?` | *string* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.ReadStream.end

Defined in: node_modules/@types/node/net.d.ts:92

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: tty.ReadStream.eventNames

Defined in: node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: tty.ReadStream.getMaxListeners

Defined in: node_modules/@types/node/globals.d.ts:576

___

### isPaused

▸ **isPaused**(): *boolean*

**Returns:** *boolean*

Inherited from: tty.ReadStream.isPaused

Defined in: node_modules/@types/node/stream.d.ts:42

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: tty.ReadStream.listenerCount

Defined in: node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: tty.ReadStream.listeners

Defined in: node_modules/@types/node/globals.d.ts:577

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.off

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:125

▸ **on**(`event`: ``"close"``, `listener`: (`had_error`: *boolean*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`had_error`: *boolean*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:126

▸ **on**(`event`: ``"connect"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:127

▸ **on**(`event`: ``"data"``, `listener`: (`data`: *Buffer*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`data`: *Buffer*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:128

▸ **on**(`event`: ``"drain"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:129

▸ **on**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:130

▸ **on**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:131

▸ **on**(`event`: ``"lookup"``, `listener`: (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `listener` | (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:132

▸ **on**(`event`: ``"timeout"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.on

Defined in: node_modules/@types/node/net.d.ts:133

___

### once

▸ **once**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:135

▸ **once**(`event`: ``"close"``, `listener`: (`had_error`: *boolean*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`had_error`: *boolean*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:136

▸ **once**(`event`: ``"connect"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:137

▸ **once**(`event`: ``"data"``, `listener`: (`data`: *Buffer*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`data`: *Buffer*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:138

▸ **once**(`event`: ``"drain"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:139

▸ **once**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:140

▸ **once**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:141

▸ **once**(`event`: ``"lookup"``, `listener`: (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `listener` | (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:142

▸ **once**(`event`: ``"timeout"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.once

Defined in: node_modules/@types/node/net.d.ts:143

___

### pause

▸ **pause**(): [*ReadStream*](globalenv.nodejs.readstream.md)

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.pause

Defined in: node_modules/@types/node/net.d.ts:69

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

Inherited from: tty.ReadStream.pipe

Defined in: node_modules/@types/node/stream.d.ts:5

___

### prependListener

▸ **prependListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:145

▸ **prependListener**(`event`: ``"close"``, `listener`: (`had_error`: *boolean*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`had_error`: *boolean*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:146

▸ **prependListener**(`event`: ``"connect"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:147

▸ **prependListener**(`event`: ``"data"``, `listener`: (`data`: *Buffer*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`data`: *Buffer*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:148

▸ **prependListener**(`event`: ``"drain"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:149

▸ **prependListener**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:150

▸ **prependListener**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:151

▸ **prependListener**(`event`: ``"lookup"``, `listener`: (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `listener` | (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:152

▸ **prependListener**(`event`: ``"timeout"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependListener

Defined in: node_modules/@types/node/net.d.ts:153

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:155

▸ **prependOnceListener**(`event`: ``"close"``, `listener`: (`had_error`: *boolean*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`had_error`: *boolean*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:156

▸ **prependOnceListener**(`event`: ``"connect"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"connect"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:157

▸ **prependOnceListener**(`event`: ``"data"``, `listener`: (`data`: *Buffer*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`data`: *Buffer*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:158

▸ **prependOnceListener**(`event`: ``"drain"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:159

▸ **prependOnceListener**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:160

▸ **prependOnceListener**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:161

▸ **prependOnceListener**(`event`: ``"lookup"``, `listener`: (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"lookup"`` |
| `listener` | (`err`: Error, `address`: *string*, `family`: *string* \| *number*, `host`: *string*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:162

▸ **prependOnceListener**(`event`: ``"timeout"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"timeout"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.prependOnceListener

Defined in: node_modules/@types/node/net.d.ts:163

___

### push

▸ **push**(`chunk`: *any*, `encoding?`: *string*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *any* |
| `encoding?` | *string* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.push

Defined in: node_modules/@types/node/stream.d.ts:46

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: tty.ReadStream.rawListeners

Defined in: node_modules/@types/node/globals.d.ts:578

___

### read

▸ **read**(`size?`: *number*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | *number* |

**Returns:** *any*

Inherited from: tty.ReadStream.read

Defined in: node_modules/@types/node/stream.d.ts:38

___

### ref

▸ **ref**(): [*ReadStream*](globalenv.nodejs.readstream.md)

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.ref

Defined in: node_modules/@types/node/net.d.ts:76

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeAllListeners

Defined in: node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`: ``"close"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:115

▸ **removeListener**(`event`: ``"data"``, `listener`: (`chunk`: *any*) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: *any*) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:116

▸ **removeListener**(`event`: ``"end"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:117

▸ **removeListener**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:118

▸ **removeListener**(`event`: ``"pause"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:119

▸ **removeListener**(`event`: ``"readable"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:120

▸ **removeListener**(`event`: ``"resume"``, `listener`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:121

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:122

___

### resume

▸ **resume**(): [*ReadStream*](globalenv.nodejs.readstream.md)

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.resume

Defined in: node_modules/@types/node/net.d.ts:70

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`: *string*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | *string* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setDefaultEncoding

Defined in: node_modules/@types/node/stream.d.ts:261

___

### setEncoding

▸ **setEncoding**(`encoding?`: *string*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding?` | *string* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setEncoding

Defined in: node_modules/@types/node/net.d.ts:68

___

### setKeepAlive

▸ **setKeepAlive**(`enable?`: *boolean*, `initialDelay?`: *number*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enable?` | *boolean* |
| `initialDelay?` | *number* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setKeepAlive

Defined in: node_modules/@types/node/net.d.ts:73

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setMaxListeners

Defined in: node_modules/@types/node/globals.d.ts:575

___

### setNoDelay

▸ **setNoDelay**(`noDelay?`: *boolean*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `noDelay?` | *boolean* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setNoDelay

Defined in: node_modules/@types/node/net.d.ts:72

___

### setRawMode

▸ **setRawMode**(`mode`: *boolean*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | *boolean* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setRawMode

Defined in: node_modules/@types/node/tty.d.ts:8

___

### setTimeout

▸ **setTimeout**(`timeout`: *number*, `callback?`: () => *void*): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout` | *number* |
| `callback?` | () => *void* |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.setTimeout

Defined in: node_modules/@types/node/net.d.ts:71

___

### uncork

▸ **uncork**(): *void*

**Returns:** *void*

Inherited from: tty.ReadStream.uncork

Defined in: node_modules/@types/node/stream.d.ts:266

___

### unpipe

▸ **unpipe**(`destination?`: [*WritableStream*](globalenv.nodejs.writablestream.md)): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [*WritableStream*](globalenv.nodejs.writablestream.md) |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.unpipe

Defined in: node_modules/@types/node/stream.d.ts:43

___

### unref

▸ **unref**(): [*ReadStream*](globalenv.nodejs.readstream.md)

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.unref

Defined in: node_modules/@types/node/net.d.ts:75

___

### unshift

▸ **unshift**(`chunk`: *any*, `encoding?`: BufferEncoding): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *any* |
| `encoding?` | BufferEncoding |

**Returns:** *void*

Inherited from: tty.ReadStream.unshift

Defined in: node_modules/@types/node/stream.d.ts:44

___

### wrap

▸ **wrap**(`oldStream`: [*ReadableStream*](globalenv.nodejs.readablestream.md)): [*ReadStream*](globalenv.nodejs.readstream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [*ReadableStream*](globalenv.nodejs.readablestream.md) |

**Returns:** [*ReadStream*](globalenv.nodejs.readstream.md)

Inherited from: tty.ReadStream.wrap

Defined in: node_modules/@types/node/stream.d.ts:45

___

### write

▸ **write**(`buffer`: *string* \| *Uint8Array*, `cb?`: (`err?`: Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | (`err?`: Error) => *void* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.write

Defined in: node_modules/@types/node/net.d.ts:60

▸ **write**(`str`: *string* \| *Uint8Array*, `encoding?`: *string*, `cb?`: (`err?`: Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* \| *Uint8Array* |
| `encoding?` | *string* |
| `cb?` | (`err?`: Error) => *void* |

**Returns:** *boolean*

Inherited from: tty.ReadStream.write

Defined in: node_modules/@types/node/net.d.ts:61
