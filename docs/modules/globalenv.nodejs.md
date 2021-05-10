[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](globalenv.md) / NodeJS

# Namespace: NodeJS

[globalEnv](globalenv.md).NodeJS

环境声明文件，请不要在这里放接口类型声明与一般变量声明

## Table of contents

### Interfaces

- [CallSite](../interfaces/globalenv.nodejs.callsite.md)
- [ConsoleConstructor](../interfaces/globalenv.nodejs.consoleconstructor.md)
- [ConsoleConstructorOptions](../interfaces/globalenv.nodejs.consoleconstructoroptions.md)
- [CpuUsage](../interfaces/globalenv.nodejs.cpuusage.md)
- [Dict](../interfaces/globalenv.nodejs.dict.md)
- [Domain](../interfaces/globalenv.nodejs.domain.md)
- [EmitWarningOptions](../interfaces/globalenv.nodejs.emitwarningoptions.md)
- [ErrnoException](../interfaces/globalenv.nodejs.errnoexception.md)
- [EventEmitter](../interfaces/globalenv.nodejs.eventemitter.md)
- [Global](../interfaces/globalenv.nodejs.global.md)
- [HRTime](../interfaces/globalenv.nodejs.hrtime.md)
- [Immediate](../interfaces/globalenv.nodejs.immediate.md)
- [InspectOptions](../interfaces/globalenv.nodejs.inspectoptions.md)
- [MemoryUsage](../interfaces/globalenv.nodejs.memoryusage.md)
- [Module](../interfaces/globalenv.nodejs.module.md)
- [Process](../interfaces/globalenv.nodejs.process.md)
- [ProcessEnv](../interfaces/globalenv.nodejs.processenv.md)
- [ProcessRelease](../interfaces/globalenv.nodejs.processrelease.md)
- [ProcessReport](../interfaces/globalenv.nodejs.processreport.md)
- [ProcessVersions](../interfaces/globalenv.nodejs.processversions.md)
- [ReadOnlyDict](../interfaces/globalenv.nodejs.readonlydict.md)
- [ReadStream](../interfaces/globalenv.nodejs.readstream.md)
- [ReadWriteStream](../interfaces/globalenv.nodejs.readwritestream.md)
- [ReadableStream](../interfaces/globalenv.nodejs.readablestream.md)
- [RefCounted](../interfaces/globalenv.nodejs.refcounted.md)
- [Require](../interfaces/globalenv.nodejs.require.md)
- [RequireExtensions](../interfaces/globalenv.nodejs.requireextensions.md)
- [RequireResolve](../interfaces/globalenv.nodejs.requireresolve.md)
- [ResourceUsage](../interfaces/globalenv.nodejs.resourceusage.md)
- [Socket](../interfaces/globalenv.nodejs.socket.md)
- [Timeout](../interfaces/globalenv.nodejs.timeout.md)
- [Timer](../interfaces/globalenv.nodejs.timer.md)
- [WritableStream](../interfaces/globalenv.nodejs.writablestream.md)
- [WriteStream](../interfaces/globalenv.nodejs.writestream.md)

### Type aliases

- [ArrayBufferView](globalenv.nodejs.md#arraybufferview)
- [BeforeExitListener](globalenv.nodejs.md#beforeexitlistener)
- [DisconnectListener](globalenv.nodejs.md#disconnectlistener)
- [ExitListener](globalenv.nodejs.md#exitlistener)
- [MessageListener](globalenv.nodejs.md#messagelistener)
- [MultipleResolveListener](globalenv.nodejs.md#multipleresolvelistener)
- [MultipleResolveType](globalenv.nodejs.md#multipleresolvetype)
- [NewListenerListener](globalenv.nodejs.md#newlistenerlistener)
- [Platform](globalenv.nodejs.md#platform)
- [RejectionHandledListener](globalenv.nodejs.md#rejectionhandledlistener)
- [RemoveListenerListener](globalenv.nodejs.md#removelistenerlistener)
- [Signals](globalenv.nodejs.md#signals)
- [SignalsListener](globalenv.nodejs.md#signalslistener)
- [TypedArray](globalenv.nodejs.md#typedarray)
- [UncaughtExceptionListener](globalenv.nodejs.md#uncaughtexceptionlistener)
- [UnhandledRejectionListener](globalenv.nodejs.md#unhandledrejectionlistener)
- [WarningListener](globalenv.nodejs.md#warninglistener)

## Type aliases

### ArrayBufferView

Ƭ **ArrayBufferView**: [*TypedArray*](globalenv.nodejs.md#typedarray) \| DataView

Defined in: node_modules/@types/node/globals.d.ts:601

___

### BeforeExitListener

Ƭ **BeforeExitListener**: (`code`: *number*) => *void*

#### Type declaration

▸ (`code`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:65

___

### DisconnectListener

Ƭ **DisconnectListener**: () => *void*

#### Type declaration

▸ (): *void*

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:66

___

### ExitListener

Ƭ **ExitListener**: (`code`: *number*) => *void*

#### Type declaration

▸ (`code`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:67

___

### MessageListener

Ƭ **MessageListener**: (`message`: *any*, `sendHandle`: *any*) => *void*

#### Type declaration

▸ (`message`: *any*, `sendHandle`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | *any* |
| `sendHandle` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:72

___

### MultipleResolveListener

Ƭ **MultipleResolveListener**: (`type`: [*MultipleResolveType*](globalenv.nodejs.md#multipleresolvetype), `promise`: *Promise*<any\>, `value`: *any*) => *void*

#### Type declaration

▸ (`type`: [*MultipleResolveType*](globalenv.nodejs.md#multipleresolvetype), `promise`: *Promise*<any\>, `value`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [*MultipleResolveType*](globalenv.nodejs.md#multipleresolvetype) |
| `promise` | *Promise*<any\> |
| `value` | *any* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:76

___

### MultipleResolveType

Ƭ **MultipleResolveType**: ``"resolve"`` \| ``"reject"``

Defined in: node_modules/@types/node/process.d.ts:63

___

### NewListenerListener

Ƭ **NewListenerListener**: (`type`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*) => *void*

#### Type declaration

▸ (`type`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:74

___

### Platform

Ƭ **Platform**: ``"aix"`` \| ``"android"`` \| ``"darwin"`` \| ``"freebsd"`` \| ``"linux"`` \| ``"openbsd"`` \| ``"sunos"`` \| ``"win32"`` \| ``"cygwin"`` \| ``"netbsd"``

Defined in: node_modules/@types/node/process.d.ts:46

___

### RejectionHandledListener

Ƭ **RejectionHandledListener**: (`promise`: *Promise*<any\>) => *void*

#### Type declaration

▸ (`promise`: *Promise*<any\>): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | *Promise*<any\> |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:68

___

### RemoveListenerListener

Ƭ **RemoveListenerListener**: (`type`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*) => *void*

#### Type declaration

▸ (`type`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:75

___

### Signals

Ƭ **Signals**: ``"SIGABRT"`` \| ``"SIGALRM"`` \| ``"SIGBUS"`` \| ``"SIGCHLD"`` \| ``"SIGCONT"`` \| ``"SIGFPE"`` \| ``"SIGHUP"`` \| ``"SIGILL"`` \| ``"SIGINT"`` \| ``"SIGIO"`` \| ``"SIGIOT"`` \| ``"SIGKILL"`` \| ``"SIGPIPE"`` \| ``"SIGPOLL"`` \| ``"SIGPROF"`` \| ``"SIGPWR"`` \| ``"SIGQUIT"`` \| ``"SIGSEGV"`` \| ``"SIGSTKFLT"`` \| ``"SIGSTOP"`` \| ``"SIGSYS"`` \| ``"SIGTERM"`` \| ``"SIGTRAP"`` \| ``"SIGTSTP"`` \| ``"SIGTTIN"`` \| ``"SIGTTOU"`` \| ``"SIGUNUSED"`` \| ``"SIGURG"`` \| ``"SIGUSR1"`` \| ``"SIGUSR2"`` \| ``"SIGVTALRM"`` \| ``"SIGWINCH"`` \| ``"SIGXCPU"`` \| ``"SIGXFSZ"`` \| ``"SIGBREAK"`` \| ``"SIGLOST"`` \| ``"SIGINFO"``

Defined in: node_modules/@types/node/process.d.ts:57

___

### SignalsListener

Ƭ **SignalsListener**: (`signal`: [*Signals*](globalenv.nodejs.md#signals)) => *void*

#### Type declaration

▸ (`signal`: [*Signals*](globalenv.nodejs.md#signals)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | [*Signals*](globalenv.nodejs.md#signals) |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:73

___

### TypedArray

Ƭ **TypedArray**: Uint8Array \| Uint8ClampedArray \| Uint16Array \| Uint32Array \| Int8Array \| Int16Array \| Int32Array \| BigUint64Array \| BigInt64Array \| Float32Array \| Float64Array

Defined in: node_modules/@types/node/globals.d.ts:589

___

### UncaughtExceptionListener

Ƭ **UncaughtExceptionListener**: (`error`: Error) => *void*

#### Type declaration

▸ (`error`: Error): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | Error |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:69

___

### UnhandledRejectionListener

Ƭ **UnhandledRejectionListener**: (`reason`: {} \| ``null`` \| *undefined*, `promise`: *Promise*<any\>) => *void*

#### Type declaration

▸ (`reason`: {} \| ``null`` \| *undefined*, `promise`: *Promise*<any\>): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason` | {} \| ``null`` \| *undefined* |
| `promise` | *Promise*<any\> |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:70

___

### WarningListener

Ƭ **WarningListener**: (`warning`: Error) => *void*

#### Type declaration

▸ (`warning`: Error): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `warning` | Error |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:71
