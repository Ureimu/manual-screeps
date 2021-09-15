[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / WriteStream

# Interface: WriteStream

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).WriteStream

## Hierarchy

- *WriteStream*

  ↳ **WriteStream**

## Table of contents

### Properties

- [bufferSize](globalenv.nodejs.writestream.md#buffersize)
- [bytesRead](globalenv.nodejs.writestream.md#bytesread)
- [bytesWritten](globalenv.nodejs.writestream.md#byteswritten)
- [columns](globalenv.nodejs.writestream.md#columns)
- [connecting](globalenv.nodejs.writestream.md#connecting)
- [destroyed](globalenv.nodejs.writestream.md#destroyed)
- [isTTY](globalenv.nodejs.writestream.md#istty)
- [localAddress](globalenv.nodejs.writestream.md#localaddress)
- [localPort](globalenv.nodejs.writestream.md#localport)
- [readable](globalenv.nodejs.writestream.md#readable)
- [readableEncoding](globalenv.nodejs.writestream.md#readableencoding)
- [readableEnded](globalenv.nodejs.writestream.md#readableended)
- [readableFlowing](globalenv.nodejs.writestream.md#readableflowing)
- [readableHighWaterMark](globalenv.nodejs.writestream.md#readablehighwatermark)
- [readableLength](globalenv.nodejs.writestream.md#readablelength)
- [readableObjectMode](globalenv.nodejs.writestream.md#readableobjectmode)
- [remoteAddress](globalenv.nodejs.writestream.md#remoteaddress)
- [remoteFamily](globalenv.nodejs.writestream.md#remotefamily)
- [remotePort](globalenv.nodejs.writestream.md#remoteport)
- [rows](globalenv.nodejs.writestream.md#rows)
- [writable](globalenv.nodejs.writestream.md#writable)
- [writableCorked](globalenv.nodejs.writestream.md#writablecorked)
- [writableEnded](globalenv.nodejs.writestream.md#writableended)
- [writableFinished](globalenv.nodejs.writestream.md#writablefinished)
- [writableHighWaterMark](globalenv.nodejs.writestream.md#writablehighwatermark)
- [writableLength](globalenv.nodejs.writestream.md#writablelength)
- [writableObjectMode](globalenv.nodejs.writestream.md#writableobjectmode)

### Methods

- [[Symbol.asyncIterator]](globalenv.nodejs.writestream.md#[symbol.asynciterator])
- [\_destroy](globalenv.nodejs.writestream.md#_destroy)
- [\_final](globalenv.nodejs.writestream.md#_final)
- [\_read](globalenv.nodejs.writestream.md#_read)
- [\_write](globalenv.nodejs.writestream.md#_write)
- [\_writev](globalenv.nodejs.writestream.md#_writev)
- [addListener](globalenv.nodejs.writestream.md#addlistener)
- [address](globalenv.nodejs.writestream.md#address)
- [clearLine](globalenv.nodejs.writestream.md#clearline)
- [clearScreenDown](globalenv.nodejs.writestream.md#clearscreendown)
- [connect](globalenv.nodejs.writestream.md#connect)
- [cork](globalenv.nodejs.writestream.md#cork)
- [cursorTo](globalenv.nodejs.writestream.md#cursorto)
- [destroy](globalenv.nodejs.writestream.md#destroy)
- [emit](globalenv.nodejs.writestream.md#emit)
- [end](globalenv.nodejs.writestream.md#end)
- [eventNames](globalenv.nodejs.writestream.md#eventnames)
- [getColorDepth](globalenv.nodejs.writestream.md#getcolordepth)
- [getMaxListeners](globalenv.nodejs.writestream.md#getmaxlisteners)
- [getWindowSize](globalenv.nodejs.writestream.md#getwindowsize)
- [hasColors](globalenv.nodejs.writestream.md#hascolors)
- [isPaused](globalenv.nodejs.writestream.md#ispaused)
- [listenerCount](globalenv.nodejs.writestream.md#listenercount)
- [listeners](globalenv.nodejs.writestream.md#listeners)
- [moveCursor](globalenv.nodejs.writestream.md#movecursor)
- [off](globalenv.nodejs.writestream.md#off)
- [on](globalenv.nodejs.writestream.md#on)
- [once](globalenv.nodejs.writestream.md#once)
- [pause](globalenv.nodejs.writestream.md#pause)
- [pipe](globalenv.nodejs.writestream.md#pipe)
- [prependListener](globalenv.nodejs.writestream.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.writestream.md#prependoncelistener)
- [push](globalenv.nodejs.writestream.md#push)
- [rawListeners](globalenv.nodejs.writestream.md#rawlisteners)
- [read](globalenv.nodejs.writestream.md#read)
- [ref](globalenv.nodejs.writestream.md#ref)
- [removeAllListeners](globalenv.nodejs.writestream.md#removealllisteners)
- [removeListener](globalenv.nodejs.writestream.md#removelistener)
- [resume](globalenv.nodejs.writestream.md#resume)
- [setDefaultEncoding](globalenv.nodejs.writestream.md#setdefaultencoding)
- [setEncoding](globalenv.nodejs.writestream.md#setencoding)
- [setKeepAlive](globalenv.nodejs.writestream.md#setkeepalive)
- [setMaxListeners](globalenv.nodejs.writestream.md#setmaxlisteners)
- [setNoDelay](globalenv.nodejs.writestream.md#setnodelay)
- [setTimeout](globalenv.nodejs.writestream.md#settimeout)
- [uncork](globalenv.nodejs.writestream.md#uncork)
- [unpipe](globalenv.nodejs.writestream.md#unpipe)
- [unref](globalenv.nodejs.writestream.md#unref)
- [unshift](globalenv.nodejs.writestream.md#unshift)
- [wrap](globalenv.nodejs.writestream.md#wrap)
- [write](globalenv.nodejs.writestream.md#write)

## Properties

### bufferSize

• `Readonly` **bufferSize**: *number*

Inherited from: tty.WriteStream.bufferSize

Defined in: node_modules/@types/node/net.d.ts:78

___

### bytesRead

• `Readonly` **bytesRead**: *number*

Inherited from: tty.WriteStream.bytesRead

Defined in: node_modules/@types/node/net.d.ts:79

___

### bytesWritten

• `Readonly` **bytesWritten**: *number*

Inherited from: tty.WriteStream.bytesWritten

Defined in: node_modules/@types/node/net.d.ts:80

___

### columns

• **columns**: *number*

Inherited from: tty.WriteStream.columns

Defined in: node_modules/@types/node/tty.d.ts:62

___

### connecting

• `Readonly` **connecting**: *boolean*

Inherited from: tty.WriteStream.connecting

Defined in: node_modules/@types/node/net.d.ts:81

___

### destroyed

• `Readonly` **destroyed**: *boolean*

Inherited from: tty.WriteStream.destroyed

Defined in: node_modules/@types/node/net.d.ts:82

___

### isTTY

• **isTTY**: *boolean*

Inherited from: tty.WriteStream.isTTY

Defined in: node_modules/@types/node/tty.d.ts:64

___

### localAddress

• `Readonly` **localAddress**: *string*

Inherited from: tty.WriteStream.localAddress

Defined in: node_modules/@types/node/net.d.ts:83

___

### localPort

• `Readonly` **localPort**: *number*

Inherited from: tty.WriteStream.localPort

Defined in: node_modules/@types/node/net.d.ts:84

___

### readable

• **readable**: *boolean*

Inherited from: tty.WriteStream.readable

Defined in: node_modules/@types/node/stream.d.ts:28

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| BufferEncoding

Inherited from: tty.WriteStream.readableEncoding

Defined in: node_modules/@types/node/stream.d.ts:29

___

### readableEnded

• `Readonly` **readableEnded**: *boolean*

Inherited from: tty.WriteStream.readableEnded

Defined in: node_modules/@types/node/stream.d.ts:30

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| *boolean*

Inherited from: tty.WriteStream.readableFlowing

Defined in: node_modules/@types/node/stream.d.ts:31

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: *number*

Inherited from: tty.WriteStream.readableHighWaterMark

Defined in: node_modules/@types/node/stream.d.ts:32

___

### readableLength

• `Readonly` **readableLength**: *number*

Inherited from: tty.WriteStream.readableLength

Defined in: node_modules/@types/node/stream.d.ts:33

___

### readableObjectMode

• `Readonly` **readableObjectMode**: *boolean*

Inherited from: tty.WriteStream.readableObjectMode

Defined in: node_modules/@types/node/stream.d.ts:34

___

### remoteAddress

• `Optional` `Readonly` **remoteAddress**: *string*

Inherited from: tty.WriteStream.remoteAddress

Defined in: node_modules/@types/node/net.d.ts:85

___

### remoteFamily

• `Optional` `Readonly` **remoteFamily**: *string*

Inherited from: tty.WriteStream.remoteFamily

Defined in: node_modules/@types/node/net.d.ts:86

___

### remotePort

• `Optional` `Readonly` **remotePort**: *number*

Inherited from: tty.WriteStream.remotePort

Defined in: node_modules/@types/node/net.d.ts:87

___

### rows

• **rows**: *number*

Inherited from: tty.WriteStream.rows

Defined in: node_modules/@types/node/tty.d.ts:63

___

### writable

• `Readonly` **writable**: *boolean*

Inherited from: tty.WriteStream.writable

Defined in: node_modules/@types/node/stream.d.ts:247

___

### writableCorked

• `Readonly` **writableCorked**: *number*

Inherited from: tty.WriteStream.writableCorked

Defined in: node_modules/@types/node/stream.d.ts:253

___

### writableEnded

• `Readonly` **writableEnded**: *boolean*

Inherited from: tty.WriteStream.writableEnded

Defined in: node_modules/@types/node/stream.d.ts:248

___

### writableFinished

• `Readonly` **writableFinished**: *boolean*

Inherited from: tty.WriteStream.writableFinished

Defined in: node_modules/@types/node/stream.d.ts:249

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: *number*

Inherited from: tty.WriteStream.writableHighWaterMark

Defined in: node_modules/@types/node/stream.d.ts:250

___

### writableLength

• `Readonly` **writableLength**: *number*

Inherited from: tty.WriteStream.writableLength

Defined in: node_modules/@types/node/stream.d.ts:251

___

### writableObjectMode

• `Readonly` **writableObjectMode**: *boolean*

Inherited from: tty.WriteStream.writableObjectMode

Defined in: node_modules/@types/node/stream.d.ts:252

## Methods

### [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator*<any\>

**Returns:** *AsyncIterableIterator*<any\>

Inherited from: tty.WriteStream.\_\_@asyncIterator

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

Inherited from: tty.WriteStream.\_destroy

Defined in: node_modules/@types/node/stream.d.ts:257

___

### \_final

▸ **_final**(`callback`: (`error?`: ``null`` \| Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| Error) => *void* |

**Returns:** *void*

Inherited from: tty.WriteStream.\_final

Defined in: node_modules/@types/node/stream.d.ts:258

___

### \_read

▸ **_read**(`size`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | *number* |

**Returns:** *void*

Inherited from: tty.WriteStream.\_read

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

Inherited from: tty.WriteStream.\_write

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

Inherited from: tty.WriteStream.\_writev

Defined in: node_modules/@types/node/stream.d.ts:256

___

### addListener

▸ **addListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.addListener

Defined in: node_modules/@types/node/tty.d.ts:19

▸ **addListener**(`event`: ``"resize"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.addListener

Defined in: node_modules/@types/node/tty.d.ts:20

___

### address

▸ **address**(): *string* \| AddressInfo

**Returns:** *string* \| AddressInfo

Inherited from: tty.WriteStream.address

Defined in: node_modules/@types/node/net.d.ts:74

___

### clearLine

▸ **clearLine**(`dir`: Direction, `callback?`: () => *void*): *boolean*

Clears the current line of this WriteStream in a direction identified by `dir`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | Direction |
| `callback?` | () => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.clearLine

Defined in: node_modules/@types/node/tty.d.ts:40

___

### clearScreenDown

▸ **clearScreenDown**(`callback?`: () => *void*): *boolean*

Clears this `WriteStream` from the current cursor down.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.clearScreenDown

Defined in: node_modules/@types/node/tty.d.ts:44

___

### connect

▸ **connect**(`options`: SocketConnectOpts, `connectionListener?`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | SocketConnectOpts |
| `connectionListener?` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.connect

Defined in: node_modules/@types/node/net.d.ts:63

▸ **connect**(`port`: *number*, `host`: *string*, `connectionListener?`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | *number* |
| `host` | *string* |
| `connectionListener?` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.connect

Defined in: node_modules/@types/node/net.d.ts:64

▸ **connect**(`port`: *number*, `connectionListener?`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | *number* |
| `connectionListener?` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.connect

Defined in: node_modules/@types/node/net.d.ts:65

▸ **connect**(`path`: *string*, `connectionListener?`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | *string* |
| `connectionListener?` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.connect

Defined in: node_modules/@types/node/net.d.ts:66

___

### cork

▸ **cork**(): *void*

**Returns:** *void*

Inherited from: tty.WriteStream.cork

Defined in: node_modules/@types/node/stream.d.ts:265

___

### cursorTo

▸ **cursorTo**(`x`: *number*, `y?`: *number*, `callback?`: () => *void*): *boolean*

Moves this WriteStream's cursor to the specified position.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `y?` | *number* |
| `callback?` | () => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.cursorTo

Defined in: node_modules/@types/node/tty.d.ts:48

▸ **cursorTo**(`x`: *number*, `callback`: () => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `callback` | () => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.cursorTo

Defined in: node_modules/@types/node/tty.d.ts:49

___

### destroy

▸ **destroy**(`error?`: Error): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | Error |

**Returns:** *void*

Inherited from: tty.WriteStream.destroy

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

Inherited from: tty.WriteStream.emit

Defined in: node_modules/@types/node/tty.d.ts:22

▸ **emit**(`event`: ``"resize"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |

**Returns:** *boolean*

Inherited from: tty.WriteStream.emit

Defined in: node_modules/@types/node/tty.d.ts:23

___

### end

▸ **end**(`cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.WriteStream.end

Defined in: node_modules/@types/node/net.d.ts:90

▸ **end**(`buffer`: *string* \| *Uint8Array*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | *string* \| *Uint8Array* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.WriteStream.end

Defined in: node_modules/@types/node/net.d.ts:91

▸ **end**(`str`: *string* \| *Uint8Array*, `encoding?`: *string*, `cb?`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* \| *Uint8Array* |
| `encoding?` | *string* |
| `cb?` | () => *void* |

**Returns:** *void*

Inherited from: tty.WriteStream.end

Defined in: node_modules/@types/node/net.d.ts:92

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: tty.WriteStream.eventNames

Defined in: node_modules/@types/node/globals.d.ts:584

___

### getColorDepth

▸ **getColorDepth**(`env?`: {}): *number*

**`default`** `process.env`

#### Parameters

| Name | Type |
| :------ | :------ |
| `env?` | *object* |

**Returns:** *number*

Inherited from: tty.WriteStream.getColorDepth

Defined in: node_modules/@types/node/tty.d.ts:57

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: tty.WriteStream.getMaxListeners

Defined in: node_modules/@types/node/globals.d.ts:576

___

### getWindowSize

▸ **getWindowSize**(): [*number*, *number*]

**Returns:** [*number*, *number*]

Inherited from: tty.WriteStream.getWindowSize

Defined in: node_modules/@types/node/tty.d.ts:61

___

### hasColors

▸ **hasColors**(`depth?`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth?` | *number* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.hasColors

Defined in: node_modules/@types/node/tty.d.ts:58

▸ **hasColors**(`env?`: {}): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `env?` | *object* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.hasColors

Defined in: node_modules/@types/node/tty.d.ts:59

▸ **hasColors**(`depth`: *number*, `env?`: {}): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | *number* |
| `env?` | *object* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.hasColors

Defined in: node_modules/@types/node/tty.d.ts:60

___

### isPaused

▸ **isPaused**(): *boolean*

**Returns:** *boolean*

Inherited from: tty.WriteStream.isPaused

Defined in: node_modules/@types/node/stream.d.ts:42

___

### listenerCount

▸ **listenerCount**(`type`: *string* \| *symbol*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |

**Returns:** *number*

Inherited from: tty.WriteStream.listenerCount

Defined in: node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: tty.WriteStream.listeners

Defined in: node_modules/@types/node/globals.d.ts:577

___

### moveCursor

▸ **moveCursor**(`dx`: *number*, `dy`: *number*, `callback?`: () => *void*): *boolean*

Moves this WriteStream's cursor relative to its current position.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dx` | *number* |
| `dy` | *number* |
| `callback?` | () => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.moveCursor

Defined in: node_modules/@types/node/tty.d.ts:53

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.off

Defined in: node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.on

Defined in: node_modules/@types/node/tty.d.ts:25

▸ **on**(`event`: ``"resize"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.on

Defined in: node_modules/@types/node/tty.d.ts:26

___

### once

▸ **once**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.once

Defined in: node_modules/@types/node/tty.d.ts:28

▸ **once**(`event`: ``"resize"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.once

Defined in: node_modules/@types/node/tty.d.ts:29

___

### pause

▸ **pause**(): [*WriteStream*](globalenv.nodejs.writestream.md)

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.pause

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

Inherited from: tty.WriteStream.pipe

Defined in: node_modules/@types/node/stream.d.ts:5

___

### prependListener

▸ **prependListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.prependListener

Defined in: node_modules/@types/node/tty.d.ts:31

▸ **prependListener**(`event`: ``"resize"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.prependListener

Defined in: node_modules/@types/node/tty.d.ts:32

___

### prependOnceListener

▸ **prependOnceListener**(`event`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.prependOnceListener

Defined in: node_modules/@types/node/tty.d.ts:34

▸ **prependOnceListener**(`event`: ``"resize"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resize"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.prependOnceListener

Defined in: node_modules/@types/node/tty.d.ts:35

___

### push

▸ **push**(`chunk`: *any*, `encoding?`: *string*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | *any* |
| `encoding?` | *string* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.push

Defined in: node_modules/@types/node/stream.d.ts:46

___

### rawListeners

▸ **rawListeners**(`event`: *string* \| *symbol*): Function[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |

**Returns:** Function[]

Inherited from: tty.WriteStream.rawListeners

Defined in: node_modules/@types/node/globals.d.ts:578

___

### read

▸ **read**(`size?`: *number*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | *number* |

**Returns:** *any*

Inherited from: tty.WriteStream.read

Defined in: node_modules/@types/node/stream.d.ts:38

___

### ref

▸ **ref**(): [*WriteStream*](globalenv.nodejs.writestream.md)

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.ref

Defined in: node_modules/@types/node/net.d.ts:76

___

### removeAllListeners

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeAllListeners

Defined in: node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`: ``"close"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:115

▸ **removeListener**(`event`: ``"data"``, `listener`: (`chunk`: *any*) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: *any*) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:116

▸ **removeListener**(`event`: ``"end"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:117

▸ **removeListener**(`event`: ``"error"``, `listener`: (`err`: Error) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: Error) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:118

▸ **removeListener**(`event`: ``"pause"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:119

▸ **removeListener**(`event`: ``"readable"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:120

▸ **removeListener**(`event`: ``"resume"``, `listener`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:121

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.removeListener

Defined in: node_modules/@types/node/stream.d.ts:122

___

### resume

▸ **resume**(): [*WriteStream*](globalenv.nodejs.writestream.md)

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.resume

Defined in: node_modules/@types/node/net.d.ts:70

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`: *string*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | *string* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setDefaultEncoding

Defined in: node_modules/@types/node/stream.d.ts:261

___

### setEncoding

▸ **setEncoding**(`encoding?`: *string*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding?` | *string* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setEncoding

Defined in: node_modules/@types/node/net.d.ts:68

___

### setKeepAlive

▸ **setKeepAlive**(`enable?`: *boolean*, `initialDelay?`: *number*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `enable?` | *boolean* |
| `initialDelay?` | *number* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setKeepAlive

Defined in: node_modules/@types/node/net.d.ts:73

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setMaxListeners

Defined in: node_modules/@types/node/globals.d.ts:575

___

### setNoDelay

▸ **setNoDelay**(`noDelay?`: *boolean*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `noDelay?` | *boolean* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setNoDelay

Defined in: node_modules/@types/node/net.d.ts:72

___

### setTimeout

▸ **setTimeout**(`timeout`: *number*, `callback?`: () => *void*): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout` | *number* |
| `callback?` | () => *void* |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.setTimeout

Defined in: node_modules/@types/node/net.d.ts:71

___

### uncork

▸ **uncork**(): *void*

**Returns:** *void*

Inherited from: tty.WriteStream.uncork

Defined in: node_modules/@types/node/stream.d.ts:266

___

### unpipe

▸ **unpipe**(`destination?`: [*WritableStream*](globalenv.nodejs.writablestream.md)): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [*WritableStream*](globalenv.nodejs.writablestream.md) |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.unpipe

Defined in: node_modules/@types/node/stream.d.ts:43

___

### unref

▸ **unref**(): [*WriteStream*](globalenv.nodejs.writestream.md)

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.unref

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

Inherited from: tty.WriteStream.unshift

Defined in: node_modules/@types/node/stream.d.ts:44

___

### wrap

▸ **wrap**(`oldStream`: [*ReadableStream*](globalenv.nodejs.readablestream.md)): [*WriteStream*](globalenv.nodejs.writestream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [*ReadableStream*](globalenv.nodejs.readablestream.md) |

**Returns:** [*WriteStream*](globalenv.nodejs.writestream.md)

Inherited from: tty.WriteStream.wrap

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

Inherited from: tty.WriteStream.write

Defined in: node_modules/@types/node/net.d.ts:60

▸ **write**(`str`: *string* \| *Uint8Array*, `encoding?`: *string*, `cb?`: (`err?`: Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* \| *Uint8Array* |
| `encoding?` | *string* |
| `cb?` | (`err?`: Error) => *void* |

**Returns:** *boolean*

Inherited from: tty.WriteStream.write

Defined in: node_modules/@types/node/net.d.ts:61
