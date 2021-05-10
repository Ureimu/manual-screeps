[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Global

# Interface: Global

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Global

## Hierarchy

- *MochaGlobals*

  ↳ **Global**

## Table of contents

### Properties

- [AbortController](globalenv.nodejs.global.md#abortcontroller)
- [AbortSignal](globalenv.nodejs.global.md#abortsignal)
- [AcrossTickTaskFunction](globalenv.nodejs.global.md#acrossticktaskfunction)
- [Array](globalenv.nodejs.global.md#array)
- [ArrayBuffer](globalenv.nodejs.global.md#arraybuffer)
- [Boolean](globalenv.nodejs.global.md#boolean)
- [Buffer](globalenv.nodejs.global.md#buffer)
- [DataView](globalenv.nodejs.global.md#dataview)
- [Date](globalenv.nodejs.global.md#date)
- [Error](globalenv.nodejs.global.md#error)
- [EvalError](globalenv.nodejs.global.md#evalerror)
- [Float32Array](globalenv.nodejs.global.md#float32array)
- [Float64Array](globalenv.nodejs.global.md#float64array)
- [Function](globalenv.nodejs.global.md#function)
- [Infinity](globalenv.nodejs.global.md#infinity)
- [Int16Array](globalenv.nodejs.global.md#int16array)
- [Int32Array](globalenv.nodejs.global.md#int32array)
- [Int8Array](globalenv.nodejs.global.md#int8array)
- [Intl](globalenv.nodejs.global.md#intl)
- [JSON](globalenv.nodejs.global.md#json)
- [Map](globalenv.nodejs.global.md#map)
- [Math](globalenv.nodejs.global.md#math)
- [NaN](globalenv.nodejs.global.md#nan)
- [Number](globalenv.nodejs.global.md#number)
- [Object](globalenv.nodejs.global.md#object)
- [Promise](globalenv.nodejs.global.md#promise)
- [RangeError](globalenv.nodejs.global.md#rangeerror)
- [ReferenceError](globalenv.nodejs.global.md#referenceerror)
- [RegExp](globalenv.nodejs.global.md#regexp)
- [Set](globalenv.nodejs.global.md#set)
- [String](globalenv.nodejs.global.md#string)
- [Symbol](globalenv.nodejs.global.md#symbol)
- [SyntaxError](globalenv.nodejs.global.md#syntaxerror)
- [TypeError](globalenv.nodejs.global.md#typeerror)
- [URIError](globalenv.nodejs.global.md#urierror)
- [Uint16Array](globalenv.nodejs.global.md#uint16array)
- [Uint32Array](globalenv.nodejs.global.md#uint32array)
- [Uint8Array](globalenv.nodejs.global.md#uint8array)
- [Uint8ClampedArray](globalenv.nodejs.global.md#uint8clampedarray)
- [WeakMap](globalenv.nodejs.global.md#weakmap)
- [WeakSet](globalenv.nodejs.global.md#weakset)
- [after](globalenv.nodejs.global.md#after)
- [afterEach](globalenv.nodejs.global.md#aftereach)
- [before](globalenv.nodejs.global.md#before)
- [beforeEach](globalenv.nodejs.global.md#beforeeach)
- [clearImmediate](globalenv.nodejs.global.md#clearimmediate)
- [clearInterval](globalenv.nodejs.global.md#clearinterval)
- [clearTimeout](globalenv.nodejs.global.md#cleartimeout)
- [console](globalenv.nodejs.global.md#console)
- [constructionMemory](globalenv.nodejs.global.md#constructionmemory)
- [context](globalenv.nodejs.global.md#context)
- [creepMemory](globalenv.nodejs.global.md#creepmemory)
- [decodeURI](globalenv.nodejs.global.md#decodeuri)
- [decodeURIComponent](globalenv.nodejs.global.md#decodeuricomponent)
- [describe](globalenv.nodejs.global.md#describe)
- [encodeURI](globalenv.nodejs.global.md#encodeuri)
- [encodeURIComponent](globalenv.nodejs.global.md#encodeuricomponent)
- [escape](globalenv.nodejs.global.md#escape)
- [eval](globalenv.nodejs.global.md#eval)
- [functionClass](globalenv.nodejs.global.md#functionclass)
- [functionObject](globalenv.nodejs.global.md#functionobject)
- [gc](globalenv.nodejs.global.md#gc)
- [global](globalenv.nodejs.global.md#global)
- [isFinite](globalenv.nodejs.global.md#isfinite)
- [isNaN](globalenv.nodejs.global.md#isnan)
- [it](globalenv.nodejs.global.md#it)
- [microFunction](globalenv.nodejs.global.md#microfunction)
- [parseFloat](globalenv.nodejs.global.md#parsefloat)
- [parseInt](globalenv.nodejs.global.md#parseint)
- [process](globalenv.nodejs.global.md#process)
- [queueMicrotask](globalenv.nodejs.global.md#queuemicrotask)
- [reset](globalenv.nodejs.global.md#reset)
- [routeCache](globalenv.nodejs.global.md#routecache)
- [run](globalenv.nodejs.global.md#run)
- [setImmediate](globalenv.nodejs.global.md#setimmediate)
- [setInterval](globalenv.nodejs.global.md#setinterval)
- [setTimeout](globalenv.nodejs.global.md#settimeout)
- [setup](globalenv.nodejs.global.md#setup)
- [specify](globalenv.nodejs.global.md#specify)
- [suite](globalenv.nodejs.global.md#suite)
- [suiteSetup](globalenv.nodejs.global.md#suitesetup)
- [suiteTeardown](globalenv.nodejs.global.md#suiteteardown)
- [teardown](globalenv.nodejs.global.md#teardown)
- [test](globalenv.nodejs.global.md#test)
- [undefined](globalenv.nodejs.global.md#undefined)
- [unescape](globalenv.nodejs.global.md#unescape)
- [v8debug](globalenv.nodejs.global.md#v8debug)
- [version](globalenv.nodejs.global.md#version)
- [xcontext](globalenv.nodejs.global.md#xcontext)
- [xdescribe](globalenv.nodejs.global.md#xdescribe)
- [xit](globalenv.nodejs.global.md#xit)
- [xspecify](globalenv.nodejs.global.md#xspecify)

## Properties

### AbortController

• **AbortController**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | AbortController |

Defined in: node_modules/@types/node/globals.d.ts:502

___

### AbortSignal

• **AbortSignal**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | AbortSignal |

Defined in: node_modules/@types/node/globals.d.ts:503

___

### AcrossTickTaskFunction

• **AcrossTickTaskFunction**: *object*

#### Type declaration

Defined in: src/utils/AcrossTick/type.ts:7

___

### Array

• **Array**: ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:504

___

### ArrayBuffer

• **ArrayBuffer**: ArrayBufferConstructor

Defined in: node_modules/@types/node/globals.d.ts:505

___

### Boolean

• **Boolean**: BooleanConstructor

Defined in: node_modules/@types/node/globals.d.ts:506

___

### Buffer

• **Buffer**: *typeof* Buffer

Defined in: node_modules/@types/node/globals.d.ts:507

___

### DataView

• **DataView**: DataViewConstructor

Defined in: node_modules/@types/node/globals.d.ts:508

___

### Date

• **Date**: DateConstructor

Defined in: node_modules/@types/node/globals.d.ts:509

___

### Error

• **Error**: ErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:510

___

### EvalError

• **EvalError**: EvalErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:511

___

### Float32Array

• **Float32Array**: Float32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:512

___

### Float64Array

• **Float64Array**: Float64ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:513

___

### Function

• **Function**: FunctionConstructor

Defined in: node_modules/@types/node/globals.d.ts:514

___

### Infinity

• **Infinity**: *number*

Defined in: node_modules/@types/node/globals.d.ts:515

___

### Int16Array

• **Int16Array**: Int16ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:516

___

### Int32Array

• **Int32Array**: Int32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:517

___

### Int8Array

• **Int8Array**: Int8ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:518

___

### Intl

• **Intl**: *typeof* Intl

Defined in: node_modules/@types/node/globals.d.ts:519

___

### JSON

• **JSON**: JSON

Defined in: node_modules/@types/node/globals.d.ts:520

___

### Map

• **Map**: MapConstructor

Defined in: node_modules/@types/node/globals.d.ts:521

___

### Math

• **Math**: Math

Defined in: node_modules/@types/node/globals.d.ts:522

___

### NaN

• **NaN**: *number*

Defined in: node_modules/@types/node/globals.d.ts:523

___

### Number

• **Number**: NumberConstructor

Defined in: node_modules/@types/node/globals.d.ts:524

___

### Object

• **Object**: ObjectConstructor

Defined in: node_modules/@types/node/globals.d.ts:525

___

### Promise

• **Promise**: PromiseConstructor

Defined in: node_modules/@types/node/globals.d.ts:526

___

### RangeError

• **RangeError**: RangeErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:527

___

### ReferenceError

• **ReferenceError**: ReferenceErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:528

___

### RegExp

• **RegExp**: RegExpConstructor

Defined in: node_modules/@types/node/globals.d.ts:529

___

### Set

• **Set**: SetConstructor

Defined in: node_modules/@types/node/globals.d.ts:530

___

### String

• **String**: StringConstructor

Defined in: node_modules/@types/node/globals.d.ts:531

___

### Symbol

• **Symbol**: Function

Defined in: node_modules/@types/node/globals.d.ts:532

___

### SyntaxError

• **SyntaxError**: SyntaxErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:533

___

### TypeError

• **TypeError**: TypeErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:534

___

### URIError

• **URIError**: URIErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:535

___

### Uint16Array

• **Uint16Array**: Uint16ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:536

___

### Uint32Array

• **Uint32Array**: Uint32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:537

___

### Uint8Array

• **Uint8Array**: Uint8ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:538

___

### Uint8ClampedArray

• **Uint8ClampedArray**: Uint8ClampedArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:539

___

### WeakMap

• **WeakMap**: WeakMapConstructor

Defined in: node_modules/@types/node/globals.d.ts:540

___

### WeakSet

• **WeakSet**: WeakSetConstructor

Defined in: node_modules/@types/node/globals.d.ts:541

___

### after

• **after**: HookFunction

Execute after running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#after

Defined in: node_modules/@types/mocha/index.d.ts:2349

___

### afterEach

• **afterEach**: HookFunction

Execute after each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#afterEach

Defined in: node_modules/@types/mocha/index.d.ts:2367

___

### before

• **before**: HookFunction

Execute before running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#before

Defined in: node_modules/@types/mocha/index.d.ts:2340

___

### beforeEach

• **beforeEach**: HookFunction

Execute before each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#beforeEach

Defined in: node_modules/@types/mocha/index.d.ts:2358

___

### clearImmediate

• **clearImmediate**: (`immediateId`: [*Immediate*](globalenv.nodejs.immediate.md)) => *void*

#### Type declaration

▸ (`immediateId`: [*Immediate*](globalenv.nodejs.immediate.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `immediateId` | [*Immediate*](globalenv.nodejs.immediate.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:542

Defined in: node_modules/@types/node/globals.d.ts:542

___

### clearInterval

• **clearInterval**: (`intervalId`: [*Timeout*](globalenv.nodejs.timeout.md)) => *void*

#### Type declaration

▸ (`intervalId`: [*Timeout*](globalenv.nodejs.timeout.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `intervalId` | [*Timeout*](globalenv.nodejs.timeout.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:543

Defined in: node_modules/@types/node/globals.d.ts:543

___

### clearTimeout

• **clearTimeout**: (`timeoutId`: [*Timeout*](globalenv.nodejs.timeout.md)) => *void*

#### Type declaration

▸ (`timeoutId`: [*Timeout*](globalenv.nodejs.timeout.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutId` | [*Timeout*](globalenv.nodejs.timeout.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:544

Defined in: node_modules/@types/node/globals.d.ts:544

___

### console

• **console**: Console

Defined in: node_modules/@types/node/console.d.ts:127

___

### constructionMemory

• **constructionMemory**: *object*

#### Type declaration

Defined in: src/construction/index.ts:117

___

### context

• **context**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2381

___

### creepMemory

• **creepMemory**: *object*

#### Type declaration

Defined in: src/creep/action/routeCache/index.ts:12

___

### decodeURI

• **decodeURI**: (`encodedURI`: *string*) => *string*

#### Type declaration

▸ (`encodedURI`: *string*): *string*

Gets the unencoded version of an encoded Uniform Resource Identifier (URI).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encodedURI` | *string* | A value representing an encoded URI. |

**Returns:** *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:65

Defined in: node_modules/@types/node/globals.d.ts:545

___

### decodeURIComponent

• **decodeURIComponent**: (`encodedURIComponent`: *string*) => *string*

#### Type declaration

▸ (`encodedURIComponent`: *string*): *string*

Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encodedURIComponent` | *string* | A value representing an encoded URI component. |

**Returns:** *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:71

Defined in: node_modules/@types/node/globals.d.ts:546

___

### describe

• **describe**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2374

___

### encodeURI

• **encodeURI**: (`uri`: *string*) => *string*

#### Type declaration

▸ (`uri`: *string*): *string*

Encodes a text string as a valid Uniform Resource Identifier (URI)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uri` | *string* | A value representing an encoded URI. |

**Returns:** *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:77

Defined in: node_modules/@types/node/globals.d.ts:547

___

### encodeURIComponent

• **encodeURIComponent**: (`uriComponent`: *string* \| *number* \| *boolean*) => *string*

#### Type declaration

▸ (`uriComponent`: *string* \| *number* \| *boolean*): *string*

Encodes a text string as a valid component of a Uniform Resource Identifier (URI).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uriComponent` | *string* \| *number* \| *boolean* | A value representing an encoded URI component. |

**Returns:** *string*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:83

Defined in: node_modules/@types/node/globals.d.ts:548

___

### escape

• **escape**: (`str`: *string*) => *string*

#### Type declaration

▸ (`str`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *string*

Defined in: node_modules/@types/node/globals.d.ts:549

Defined in: node_modules/@types/node/globals.d.ts:549

___

### eval

• **eval**: (`x`: *string*) => *any*

#### Type declaration

▸ (`x`: *string*): *any*

Evaluates JavaScript code and executes it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | *string* | A String value that contains valid JavaScript code. |

**Returns:** *any*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:32

Defined in: node_modules/@types/node/globals.d.ts:550

___

### functionClass

• **functionClass**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `creators` | *object* |
| `creators.accordion` | (`detail`: [*AccordionDetail*](utils_console_form_types.accordiondetail.md)) => *string* |
| `creators.button` | (`detail`: [*ButtonDetail*](utils_console_form_types.buttondetail.md)) => *string* |
| `creators.checkbox` | (`detail`: CheckboxDetail) => *string* |
| `creators.input` | (`detail`: InputDetail) => *string* |
| `creators.radio` | (`detail`: RadioDetail) => *string* |
| `creators.select` | (`detail`: SelectDetail) => *string* |
| `creators.upload` | (`detail`: UploadDetail) => *string* |
| `creepBody` | *typeof* [*creepBody*](../classes/creep_body.creepbody.md) |
| `creepGroup` | *typeof* [*creepGroup*](../classes/creep_group.creepgroup.md) |
| `plugin` | *typeof* [*plugin*](../classes/plugin.plugin-1.md) |
| `posMaintainer` | *typeof* [*posMaintainer*](../classes/flagmaintainer.posmaintainer.md) |
| `routePlan` | *typeof* [*routePlan*](../classes/creep_routeplan.routeplan.md) |
| `spawnPool` | *typeof* [*spawnPool*](../classes/spawn_spawnpool.spawnpool.md) |

Defined in: src/mount/mountGlobalFunctionClass.ts:12

___

### functionObject

• **functionObject**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bodypartsGenerator` | *any* |

Defined in: src/mount/mountGlobalFunctionObject.ts:6

___

### gc

• **gc**: () => *void*

#### Type declaration

▸ (): *void*

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:562

Defined in: node_modules/@types/node/globals.d.ts:562

___

### global

• **global**: [*Global*](globalenv.nodejs.global.md)

Defined in: node_modules/@types/node/globals.d.ts:551

___

### isFinite

• **isFinite**: (`number`: *number*) => *boolean*

#### Type declaration

▸ (`number`: *number*): *boolean*

Determines whether a supplied number is finite.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | *number* | Any numeric value. |

**Returns:** *boolean*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:59

Defined in: node_modules/@types/node/globals.d.ts:552

___

### isNaN

• **isNaN**: (`number`: *number*) => *boolean*

#### Type declaration

▸ (`number`: *number*): *boolean*

Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | *number* | A numeric value. |

**Returns:** *boolean*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:53

Defined in: node_modules/@types/node/globals.d.ts:553

___

### it

• **it**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2402

___

### microFunction

• **microFunction**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clearAll` | () => *void* |
| `clearRoutes` | () => *void* |
| `createTestCreep` | () => *void* |
| `id` | *string* |
| `testConsole` | () => *string* |
| `testConsoleCommit` | (`args`: { `uploadedFile`: *string*  }) => *string* |

Defined in: src/mount/mountGlobalFunction.ts:10

___

### parseFloat

• **parseFloat**: (`string`: *string*) => *number*

#### Type declaration

▸ (`string`: *string*): *number*

Converts a string to a floating-point number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | *string* | A string that contains a floating-point number. |

**Returns:** *number*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:47

Defined in: node_modules/@types/node/globals.d.ts:554

___

### parseInt

• **parseInt**: (`s`: *string*, `radix?`: *number*) => *number*

#### Type declaration

▸ (`s`: *string*, `radix?`: *number*): *number*

Converts a string to an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | *string* | A string to convert into a number. |
| `radix?` | *number* | A value between 2 and 36 that specifies the base of the number in numString. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal. |

**Returns:** *number*

Defined in: node_modules/typescript/lib/lib.es5.d.ts:41

Defined in: node_modules/@types/node/globals.d.ts:555

___

### process

• **process**: [*Process*](globalenv.nodejs.process.md)

Defined in: node_modules/@types/node/process.d.ts:443

___

### queueMicrotask

• **queueMicrotask**: (`callback`: () => *void*) => *void*

#### Type declaration

▸ (`callback`: () => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:65

Defined in: node_modules/@types/node/globals.d.ts:559

___

### reset

• **reset**: *boolean*

Defined in: src/globalEnv.d.ts:8

___

### routeCache

• **routeCache**: *object*

#### Type declaration

Defined in: src/creep/action/routeCache/index.ts:9

___

### run

• **run**: () => *void*

#### Type declaration

▸ (): *void*

Triggers root suite execution.

- _Only available if flag --delay is passed into Mocha._
- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#runWithSuite

**Returns:** *void*

Defined in: node_modules/@types/mocha/index.d.ts:721

Defined in: node_modules/@types/mocha/index.d.ts:2475

___

### setImmediate

• **setImmediate**: (`callback`: (...`args`: *any*[]) => *void*, ...`args`: *any*[]) => [*Immediate*](globalenv.nodejs.immediate.md)

#### Type declaration

▸ (`callback`: (...`args`: *any*[]) => *void*, ...`args`: *any*[]): [*Immediate*](globalenv.nodejs.immediate.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (...`args`: *any*[]) => *void* |
| `...args` | *any*[] |

**Returns:** [*Immediate*](globalenv.nodejs.immediate.md)

Defined in: node_modules/@types/node/globals.d.ts:556

Defined in: node_modules/@types/node/globals.d.ts:556

___

### setInterval

• **setInterval**: (`callback`: (...`args`: *any*[]) => *void*, `ms?`: *number*, ...`args`: *any*[]) => [*Timeout*](globalenv.nodejs.timeout.md)

#### Type declaration

▸ (`callback`: (...`args`: *any*[]) => *void*, `ms?`: *number*, ...`args`: *any*[]): [*Timeout*](globalenv.nodejs.timeout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (...`args`: *any*[]) => *void* |
| `ms?` | *number* |
| `...args` | *any*[] |

**Returns:** [*Timeout*](globalenv.nodejs.timeout.md)

Defined in: node_modules/@types/node/globals.d.ts:557

Defined in: node_modules/@types/node/globals.d.ts:557

___

### setTimeout

• **setTimeout**: (`callback`: (...`args`: *any*[]) => *void*, `ms?`: *number*, ...`args`: *any*[]) => [*Timeout*](globalenv.nodejs.timeout.md)

#### Type declaration

▸ (`callback`: (...`args`: *any*[]) => *void*, `ms?`: *number*, ...`args`: *any*[]): [*Timeout*](globalenv.nodejs.timeout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (...`args`: *any*[]) => *void* |
| `ms?` | *number* |
| `...args` | *any*[] |

**Returns:** [*Timeout*](globalenv.nodejs.timeout.md)

Defined in: node_modules/@types/node/globals.d.ts:558

Defined in: node_modules/@types/node/globals.d.ts:558

___

### setup

• **setup**: HookFunction

Execute before each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#beforeEach

Defined in: node_modules/@types/mocha/index.d.ts:2450

___

### specify

• **specify**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2409

___

### suite

• **suite**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2466

___

### suiteSetup

• **suiteSetup**: HookFunction

Execute before running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#before

Defined in: node_modules/@types/mocha/index.d.ts:2432

___

### suiteTeardown

• **suiteTeardown**: HookFunction

Execute after running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#after

Defined in: node_modules/@types/mocha/index.d.ts:2441

___

### teardown

• **teardown**: HookFunction

Execute after each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#afterEach

Defined in: node_modules/@types/mocha/index.d.ts:2459

___

### test

• **test**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2473

___

### undefined

• **undefined**: *undefined*

Defined in: node_modules/@types/node/globals.d.ts:560

___

### unescape

• **unescape**: (`str`: *string*) => *string*

#### Type declaration

▸ (`str`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *string*

Defined in: node_modules/@types/node/globals.d.ts:561

Defined in: node_modules/@types/node/globals.d.ts:561

___

### v8debug

• `Optional` **v8debug**: *any*

Defined in: node_modules/@types/node/globals.d.ts:563

___

### version

• **version**: *string*

Defined in: src/globalEnv.d.ts:7

___

### xcontext

• **xcontext**: PendingSuiteFunction

Pending suite.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2395

___

### xdescribe

• **xdescribe**: PendingSuiteFunction

Pending suite.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2388

___

### xit

• **xit**: PendingTestFunction

Describes a pending test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2416

___

### xspecify

• **xspecify**: PendingTestFunction

Describes a pending test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2423
