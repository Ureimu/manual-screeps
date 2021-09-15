[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Global

# Interface: Global

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Global

## Hierarchy

- *MochaGlobals*

  ↳ **Global**

## Table of contents

### Properties

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
- [GLOBAL](globalenv.nodejs.global.md#global)
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
- [context](globalenv.nodejs.global.md#context)
- [creepMemory](globalenv.nodejs.global.md#creepmemory)
- [creepRoleActionList](globalenv.nodejs.global.md#creeproleactionlist)
- [decodeURI](globalenv.nodejs.global.md#decodeuri)
- [decodeURIComponent](globalenv.nodejs.global.md#decodeuricomponent)
- [describe](globalenv.nodejs.global.md#describe)
- [encodeURI](globalenv.nodejs.global.md#encodeuri)
- [encodeURIComponent](globalenv.nodejs.global.md#encodeuricomponent)
- [escape](globalenv.nodejs.global.md#escape)
- [eval](globalenv.nodejs.global.md#eval)
- [fc](globalenv.nodejs.global.md#fc)
- [functionObject](globalenv.nodejs.global.md#functionobject)
- [gc](globalenv.nodejs.global.md#gc)
- [global](globalenv.nodejs.global.md#global)
- [isFinite](globalenv.nodejs.global.md#isfinite)
- [isNaN](globalenv.nodejs.global.md#isnan)
- [it](globalenv.nodejs.global.md#it)
- [mf](globalenv.nodejs.global.md#mf)
- [monitor](globalenv.nodejs.global.md#monitor)
- [parseFloat](globalenv.nodejs.global.md#parsefloat)
- [parseInt](globalenv.nodejs.global.md#parseint)
- [process](globalenv.nodejs.global.md#process)
- [profiler](globalenv.nodejs.global.md#profiler)
- [queueMicrotask](globalenv.nodejs.global.md#queuemicrotask)
- [reset](globalenv.nodejs.global.md#reset)
- [roomMemory](globalenv.nodejs.global.md#roommemory)
- [root](globalenv.nodejs.global.md#root)
- [routeCache](globalenv.nodejs.global.md#routecache)
- [run](globalenv.nodejs.global.md#run)
- [scoutRoomList](globalenv.nodejs.global.md#scoutroomlist)
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

### AcrossTickTaskFunction

• **AcrossTickTaskFunction**: *object*

#### Type declaration

Defined in: src/utils/AcrossTick/type.ts:7

___

### Array

• **Array**: ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1039

___

### ArrayBuffer

• **ArrayBuffer**: ArrayBufferConstructor

Defined in: node_modules/@types/node/globals.d.ts:1040

___

### Boolean

• **Boolean**: BooleanConstructor

Defined in: node_modules/@types/node/globals.d.ts:1041

___

### Buffer

• **Buffer**: *typeof* Buffer

Defined in: node_modules/@types/node/globals.d.ts:1042

___

### DataView

• **DataView**: DataViewConstructor

Defined in: node_modules/@types/node/globals.d.ts:1043

___

### Date

• **Date**: DateConstructor

Defined in: node_modules/@types/node/globals.d.ts:1044

___

### Error

• **Error**: ErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1045

___

### EvalError

• **EvalError**: EvalErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1046

___

### Float32Array

• **Float32Array**: Float32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1047

___

### Float64Array

• **Float64Array**: Float64ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1048

___

### Function

• **Function**: FunctionConstructor

Defined in: node_modules/@types/node/globals.d.ts:1049

___

### GLOBAL

• **GLOBAL**: [*Global*](globalenv.nodejs.global.md)

Defined in: node_modules/@types/node/globals.d.ts:1050

___

### Infinity

• **Infinity**: *number*

Defined in: node_modules/@types/node/globals.d.ts:1051

___

### Int16Array

• **Int16Array**: Int16ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1052

___

### Int32Array

• **Int32Array**: Int32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1053

___

### Int8Array

• **Int8Array**: Int8ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1054

___

### Intl

• **Intl**: *typeof* Intl

Defined in: node_modules/@types/node/globals.d.ts:1055

___

### JSON

• **JSON**: JSON

Defined in: node_modules/@types/node/globals.d.ts:1056

___

### Map

• **Map**: MapConstructor

Defined in: node_modules/@types/node/globals.d.ts:1057

___

### Math

• **Math**: Math

Defined in: node_modules/@types/node/globals.d.ts:1058

___

### NaN

• **NaN**: *number*

Defined in: node_modules/@types/node/globals.d.ts:1059

___

### Number

• **Number**: NumberConstructor

Defined in: node_modules/@types/node/globals.d.ts:1060

___

### Object

• **Object**: ObjectConstructor

Defined in: node_modules/@types/node/globals.d.ts:1061

___

### Promise

• **Promise**: PromiseConstructor

Defined in: node_modules/@types/node/globals.d.ts:1062

___

### RangeError

• **RangeError**: RangeErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1063

___

### ReferenceError

• **ReferenceError**: ReferenceErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1064

___

### RegExp

• **RegExp**: RegExpConstructor

Defined in: node_modules/@types/node/globals.d.ts:1065

___

### Set

• **Set**: SetConstructor

Defined in: node_modules/@types/node/globals.d.ts:1066

___

### String

• **String**: StringConstructor

Defined in: node_modules/@types/node/globals.d.ts:1067

___

### Symbol

• **Symbol**: Function

Defined in: node_modules/@types/node/globals.d.ts:1068

___

### SyntaxError

• **SyntaxError**: SyntaxErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1069

___

### TypeError

• **TypeError**: TypeErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1070

___

### URIError

• **URIError**: URIErrorConstructor

Defined in: node_modules/@types/node/globals.d.ts:1071

___

### Uint16Array

• **Uint16Array**: Uint16ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1072

___

### Uint32Array

• **Uint32Array**: Uint32ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1073

___

### Uint8Array

• **Uint8Array**: Uint8ArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1074

___

### Uint8ClampedArray

• **Uint8ClampedArray**: Uint8ClampedArrayConstructor

Defined in: node_modules/@types/node/globals.d.ts:1075

___

### WeakMap

• **WeakMap**: WeakMapConstructor

Defined in: node_modules/@types/node/globals.d.ts:1076

___

### WeakSet

• **WeakSet**: WeakSetConstructor

Defined in: node_modules/@types/node/globals.d.ts:1077

___

### after

• **after**: HookFunction

Execute after running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#after

Defined in: node_modules/@types/mocha/index.d.ts:2265

___

### afterEach

• **afterEach**: HookFunction

Execute after each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#afterEach

Defined in: node_modules/@types/mocha/index.d.ts:2283

___

### before

• **before**: HookFunction

Execute before running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#before

Defined in: node_modules/@types/mocha/index.d.ts:2256

___

### beforeEach

• **beforeEach**: HookFunction

Execute before each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#beforeEach

Defined in: node_modules/@types/mocha/index.d.ts:2274

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

Defined in: node_modules/@types/node/globals.d.ts:1078

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

Defined in: node_modules/@types/node/globals.d.ts:1079

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

Defined in: node_modules/@types/node/globals.d.ts:1080

___

### console

• **console**: Console

Defined in: node_modules/@types/node/globals.d.ts:1081

___

### context

• **context**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2297

___

### creepMemory

• **creepMemory**: *object*

#### Type declaration

Defined in: src/frame/globalEnv.d.ts:10

___

### creepRoleActionList

• **creepRoleActionList**: *object*

#### Type declaration

Defined in: src/frame/creep/action/runCreepByRole.ts:4

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

Defined in: node_modules/@types/node/globals.d.ts:1082

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

Defined in: node_modules/@types/node/globals.d.ts:1083

___

### describe

• **describe**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2290

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

Defined in: node_modules/@types/node/globals.d.ts:1084

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

Defined in: node_modules/@types/node/globals.d.ts:1085

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

Defined in: node_modules/@types/node/globals.d.ts:1086

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

Defined in: node_modules/@types/node/globals.d.ts:1087

___

### fc

• **fc**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `FlagMaintainerForm` | *typeof* [*FlagMaintainerForm*](../classes/flagmaintainer_form.flagmaintainerform.md) |
| `creators` | *object* |
| `creators.accordion` | (`detail`: AccordionDetail) => *string* |
| `creators.button` | (`detail`: ButtonDetail) => *string* |
| `creators.checkbox` | (`detail`: CheckboxDetail) => *string* |
| `creators.input` | (`detail`: InputDetail) => *string* |
| `creators.radio` | (`detail`: RadioDetail) => *string* |
| `creators.select` | (`detail`: SelectDetail) => *string* |
| `creators.upload` | (`detail`: UploadDetail) => *string* |
| `creepBodyForm` | *typeof* [*creepBodyForm*](../classes/creep_body_form.creepbodyform.md) |
| `creepGroupForm` | *typeof* [*creepGroupForm*](../classes/creep_group_form.creepgroupform.md) |
| `mermaid` | *typeof* mermaid |
| `plugin` | *typeof* [*plugin*](../classes/plugin.plugin-1.md) |
| `routePlanForm` | *typeof* [*routePlanForm*](../classes/creep_routeplan_form.routeplanform.md) |
| `spawnPoolForm` | *typeof* [*spawnPoolForm*](../classes/spawn_spawnpool_form.spawnpoolform.md) |

Defined in: src/frame/mount/mountGlobalFunctionClass.ts:13

___

### functionObject

• **functionObject**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bodypartsGenerator` | *any* |

Defined in: src/frame/mount/mountGlobalFunctionObject.ts:6

___

### gc

• **gc**: () => *void*

#### Type declaration

▸ (): *void*

**Returns:** *void*

Defined in: node_modules/@types/node/globals.d.ts:1104

___

### global

• **global**: [*Global*](globalenv.nodejs.global.md)

Defined in: node_modules/@types/node/globals.d.ts:1088

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

Defined in: node_modules/@types/node/globals.d.ts:1089

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

Defined in: node_modules/@types/node/globals.d.ts:1090

___

### it

• **it**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2318

___

### mf

• **mf**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clearAll` | () => *void* |
| `clearRoutes` | () => *void* |
| `createTestCreep` | () => *void* |
| `hasClearAll` | *boolean* |
| `id` | *string* |
| `resetAllMaintainTaskProject` | () => *void* |
| `stats` | () => *void* |
| `testConsole` | () => *string* |
| `testConsoleCommit` | (`args`: { `uploadedFile`: *string*  }) => *string* |

Defined in: src/frame/mount/mountGlobalFunction.ts:14

___

### monitor

• **monitor**: *object*

#### Type declaration

Defined in: src/frame/visual/roomInf/type.ts:15

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

Defined in: node_modules/@types/node/globals.d.ts:1091

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

Defined in: node_modules/@types/node/globals.d.ts:1092

___

### process

• **process**: [*Process*](globalenv.nodejs.process.md)

Defined in: node_modules/@types/node/globals.d.ts:1093

___

### profiler

• **profiler**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `output` | (`passedOutputLengthLimit?`: *number*) => *string* |
| `reset` | () => *void* |
| `background` | (`filter`: *string*) => *void* |
| `callgrind` | () => *void* |
| `callgrindStr` | () => *string* |
| `email` | (`duration`: *number*, `filter`: *string*) => *void* |
| `profile` | (`duration`: *number*, `filter`: *string*) => *void* |
| `restart` | () => *void* |
| `stream` | (`duration`: *number*, `filter`: *string*) => *void* |

Defined in: src/utils/profiler/path/funcPath.ts:15

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

Defined in: node_modules/@types/node/globals.d.ts:1101

___

### reset

• **reset**: *boolean*

Defined in: src/frame/globalEnv.d.ts:9

___

### roomMemory

• **roomMemory**: *object*

#### Type declaration

Defined in: src/frame/globalEnv.d.ts:11

___

### root

• **root**: [*Global*](globalenv.nodejs.global.md)

**`deprecated`** Use `global`.

Defined in: node_modules/@types/node/globals.d.ts:1097

___

### routeCache

• **routeCache**: *object*

#### Type declaration

Defined in: src/frame/creep/action/routeCache/index.ts:9

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

Defined in: node_modules/@types/mocha/index.d.ts:2391

___

### scoutRoomList

• **scoutRoomList**: *string*[]

Defined in: src/AI/AIUreium/roles/maintain/scouter/index.ts:96

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

Defined in: node_modules/@types/node/globals.d.ts:1098

___

### setInterval

• **setInterval**: (`callback`: (...`args`: *any*[]) => *void*, `ms`: *number*, ...`args`: *any*[]) => [*Timeout*](globalenv.nodejs.timeout.md)

#### Type declaration

▸ (`callback`: (...`args`: *any*[]) => *void*, `ms`: *number*, ...`args`: *any*[]): [*Timeout*](globalenv.nodejs.timeout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (...`args`: *any*[]) => *void* |
| `ms` | *number* |
| `...args` | *any*[] |

**Returns:** [*Timeout*](globalenv.nodejs.timeout.md)

Defined in: node_modules/@types/node/globals.d.ts:1099

___

### setTimeout

• **setTimeout**: (`callback`: (...`args`: *any*[]) => *void*, `ms`: *number*, ...`args`: *any*[]) => [*Timeout*](globalenv.nodejs.timeout.md)

#### Type declaration

▸ (`callback`: (...`args`: *any*[]) => *void*, `ms`: *number*, ...`args`: *any*[]): [*Timeout*](globalenv.nodejs.timeout.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (...`args`: *any*[]) => *void* |
| `ms` | *number* |
| `...args` | *any*[] |

**Returns:** [*Timeout*](globalenv.nodejs.timeout.md)

Defined in: node_modules/@types/node/globals.d.ts:1100

___

### setup

• **setup**: HookFunction

Execute before each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#beforeEach

Defined in: node_modules/@types/mocha/index.d.ts:2366

___

### specify

• **specify**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2325

___

### suite

• **suite**: SuiteFunction

Describe a "suite" containing nested suites and tests.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2382

___

### suiteSetup

• **suiteSetup**: HookFunction

Execute before running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#before

Defined in: node_modules/@types/mocha/index.d.ts:2348

___

### suiteTeardown

• **suiteTeardown**: HookFunction

Execute after running tests.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#after

Defined in: node_modules/@types/mocha/index.d.ts:2357

___

### teardown

• **teardown**: HookFunction

Execute after each test case.

- _Only available when invoked via the mocha CLI._

**`see`** https://mochajs.org/api/global.html#afterEach

Defined in: node_modules/@types/mocha/index.d.ts:2375

___

### test

• **test**: TestFunction

Describes a test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2389

___

### undefined

• **undefined**: *undefined*

Defined in: node_modules/@types/node/globals.d.ts:1102

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

Defined in: node_modules/@types/node/globals.d.ts:1103

___

### v8debug

• `Optional` **v8debug**: *any*

Defined in: node_modules/@types/node/globals.d.ts:1105

___

### version

• **version**: *string*

Defined in: src/frame/globalEnv.d.ts:8

___

### xcontext

• **xcontext**: PendingSuiteFunction

Pending suite.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2311

___

### xdescribe

• **xdescribe**: PendingSuiteFunction

Pending suite.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2304

___

### xit

• **xit**: PendingTestFunction

Describes a pending test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2332

___

### xspecify

• **xspecify**: PendingTestFunction

Describes a pending test case.

- _Only available when invoked via the mocha CLI._

Defined in: node_modules/@types/mocha/index.d.ts:2339
