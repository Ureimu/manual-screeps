[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Process

# Interface: Process

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Process

## Hierarchy

- [*EventEmitter*](globalenv.nodejs.eventemitter.md)

  ↳ **Process**

## Table of contents

### Properties

- [allowedNodeEnvironmentFlags](globalenv.nodejs.process.md#allowednodeenvironmentflags)
- [arch](globalenv.nodejs.process.md#arch)
- [argv](globalenv.nodejs.process.md#argv)
- [argv0](globalenv.nodejs.process.md#argv0)
- [config](globalenv.nodejs.process.md#config)
- [connected](globalenv.nodejs.process.md#connected)
- [debugPort](globalenv.nodejs.process.md#debugport)
- [domain](globalenv.nodejs.process.md#domain)
- [env](globalenv.nodejs.process.md#env)
- [execArgv](globalenv.nodejs.process.md#execargv)
- [execPath](globalenv.nodejs.process.md#execpath)
- [exitCode](globalenv.nodejs.process.md#exitcode)
- [features](globalenv.nodejs.process.md#features)
- [hrtime](globalenv.nodejs.process.md#hrtime)
- [mainModule](globalenv.nodejs.process.md#mainmodule)
- [pid](globalenv.nodejs.process.md#pid)
- [platform](globalenv.nodejs.process.md#platform)
- [ppid](globalenv.nodejs.process.md#ppid)
- [release](globalenv.nodejs.process.md#release)
- [report](globalenv.nodejs.process.md#report)
- [stderr](globalenv.nodejs.process.md#stderr)
- [stdin](globalenv.nodejs.process.md#stdin)
- [stdout](globalenv.nodejs.process.md#stdout)
- [title](globalenv.nodejs.process.md#title)
- [traceDeprecation](globalenv.nodejs.process.md#tracedeprecation)
- [version](globalenv.nodejs.process.md#version)
- [versions](globalenv.nodejs.process.md#versions)

### Methods

- [abort](globalenv.nodejs.process.md#abort)
- [addListener](globalenv.nodejs.process.md#addlistener)
- [chdir](globalenv.nodejs.process.md#chdir)
- [cpuUsage](globalenv.nodejs.process.md#cpuusage)
- [cwd](globalenv.nodejs.process.md#cwd)
- [disconnect](globalenv.nodejs.process.md#disconnect)
- [emit](globalenv.nodejs.process.md#emit)
- [emitWarning](globalenv.nodejs.process.md#emitwarning)
- [eventNames](globalenv.nodejs.process.md#eventnames)
- [exit](globalenv.nodejs.process.md#exit)
- [getMaxListeners](globalenv.nodejs.process.md#getmaxlisteners)
- [getegid](globalenv.nodejs.process.md#getegid)
- [geteuid](globalenv.nodejs.process.md#geteuid)
- [getgid](globalenv.nodejs.process.md#getgid)
- [getgroups](globalenv.nodejs.process.md#getgroups)
- [getuid](globalenv.nodejs.process.md#getuid)
- [hasUncaughtExceptionCaptureCallback](globalenv.nodejs.process.md#hasuncaughtexceptioncapturecallback)
- [kill](globalenv.nodejs.process.md#kill)
- [listenerCount](globalenv.nodejs.process.md#listenercount)
- [listeners](globalenv.nodejs.process.md#listeners)
- [memoryUsage](globalenv.nodejs.process.md#memoryusage)
- [nextTick](globalenv.nodejs.process.md#nexttick)
- [off](globalenv.nodejs.process.md#off)
- [on](globalenv.nodejs.process.md#on)
- [once](globalenv.nodejs.process.md#once)
- [openStdin](globalenv.nodejs.process.md#openstdin)
- [prependListener](globalenv.nodejs.process.md#prependlistener)
- [prependOnceListener](globalenv.nodejs.process.md#prependoncelistener)
- [rawListeners](globalenv.nodejs.process.md#rawlisteners)
- [removeAllListeners](globalenv.nodejs.process.md#removealllisteners)
- [removeListener](globalenv.nodejs.process.md#removelistener)
- [resourceUsage](globalenv.nodejs.process.md#resourceusage)
- [send](globalenv.nodejs.process.md#send)
- [setMaxListeners](globalenv.nodejs.process.md#setmaxlisteners)
- [setUncaughtExceptionCaptureCallback](globalenv.nodejs.process.md#setuncaughtexceptioncapturecallback)
- [setegid](globalenv.nodejs.process.md#setegid)
- [seteuid](globalenv.nodejs.process.md#seteuid)
- [setgid](globalenv.nodejs.process.md#setgid)
- [setgroups](globalenv.nodejs.process.md#setgroups)
- [setuid](globalenv.nodejs.process.md#setuid)
- [umask](globalenv.nodejs.process.md#umask)
- [uptime](globalenv.nodejs.process.md#uptime)

## Properties

### allowedNodeEnvironmentFlags

• **allowedNodeEnvironmentFlags**: *ReadonlySet*<string\>

The `process.allowedNodeEnvironmentFlags` property is a special,
read-only `Set` of flags allowable within the [`NODE_OPTIONS`][]
environment variable.

Defined in: node_modules/@types/node/process.d.ts:330

___

### arch

• **arch**: *string*

Defined in: node_modules/@types/node/process.d.ts:288

___

### argv

• **argv**: *string*[]

Defined in: node_modules/@types/node/process.d.ts:217

___

### argv0

• **argv0**: *string*

Defined in: node_modules/@types/node/process.d.ts:218

___

### config

• **config**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `target_defaults` | *object* |
| `target_defaults.cflags` | *any*[] |
| `target_defaults.default_configuration` | *string* |
| `target_defaults.defines` | *string*[] |
| `target_defaults.include_dirs` | *string*[] |
| `target_defaults.libraries` | *string*[] |
| `variables` | *object* |
| `variables.clang` | *number* |
| `variables.host_arch` | *string* |
| `variables.node_install_npm` | *boolean* |
| `variables.node_install_waf` | *boolean* |
| `variables.node_prefix` | *string* |
| `variables.node_shared_openssl` | *boolean* |
| `variables.node_shared_v8` | *boolean* |
| `variables.node_shared_zlib` | *boolean* |
| `variables.node_use_dtrace` | *boolean* |
| `variables.node_use_etw` | *boolean* |
| `variables.node_use_openssl` | *boolean* |
| `variables.target_arch` | *string* |
| `variables.v8_no_strict_aliasing` | *number* |
| `variables.v8_use_snapshot` | *boolean* |
| `variables.visibility` | *string* |

Defined in: node_modules/@types/node/process.d.ts:258

___

### connected

• **connected**: *boolean*

Defined in: node_modules/@types/node/process.d.ts:323

___

### debugPort

• **debugPort**: *number*

Defined in: node_modules/@types/node/process.d.ts:224

___

### domain

• **domain**: [*Domain*](globalenv.nodejs.domain.md)

Defined in: node_modules/@types/node/process.d.ts:318

___

### env

• **env**: [*ProcessEnv*](globalenv.nodejs.processenv.md)

Defined in: node_modules/@types/node/process.d.ts:241

___

### execArgv

• **execArgv**: *string*[]

Defined in: node_modules/@types/node/process.d.ts:219

___

### execPath

• **execPath**: *string*

Defined in: node_modules/@types/node/process.d.ts:220

___

### exitCode

• `Optional` **exitCode**: *number*

Defined in: node_modules/@types/node/process.d.ts:243

___

### features

• **features**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | *boolean* |
| `inspector` | *boolean* |
| `ipv6` | *boolean* |
| `tls` | *boolean* |
| `tls_alpn` | *boolean* |
| `tls_ocsp` | *boolean* |
| `tls_sni` | *boolean* |
| `uv` | *boolean* |

Defined in: node_modules/@types/node/process.d.ts:296

___

### hrtime

• **hrtime**: [*HRTime*](globalenv.nodejs.hrtime.md)

Defined in: node_modules/@types/node/process.d.ts:317

___

### mainModule

• `Optional` **mainModule**: [*Module*](globalenv.nodejs.module.md)

**`deprecated`** since v14.0.0 - use `require.main` instead.

Defined in: node_modules/@types/node/process.d.ts:291

___

### pid

• **pid**: *number*

Defined in: node_modules/@types/node/process.d.ts:285

___

### platform

• **platform**: [*Platform*](../modules/globalenv.nodejs.md#platform)

Defined in: node_modules/@types/node/process.d.ts:289

___

### ppid

• **ppid**: *number*

Defined in: node_modules/@types/node/process.d.ts:286

___

### release

• **release**: [*ProcessRelease*](globalenv.nodejs.processrelease.md)

Defined in: node_modules/@types/node/process.d.ts:295

___

### report

• `Optional` **report**: [*ProcessReport*](globalenv.nodejs.processreport.md)

Only available with `--experimental-report`

Defined in: node_modules/@types/node/process.d.ts:335

___

### stderr

• **stderr**: [*WriteStream*](globalenv.nodejs.writestream.md) & { `fd`: ``2``  }

Can also be a tty.WriteStream, not typed due to limitations.

Defined in: node_modules/@types/node/process.d.ts:210

___

### stdin

• **stdin**: [*ReadStream*](globalenv.nodejs.readstream.md) & { `fd`: ``0``  }

Defined in: node_modules/@types/node/process.d.ts:213

___

### stdout

• **stdout**: [*WriteStream*](globalenv.nodejs.writestream.md) & { `fd`: ``1``  }

Can also be a tty.WriteStream, not typed due to limitations.

Defined in: node_modules/@types/node/process.d.ts:204

___

### title

• **title**: *string*

Defined in: node_modules/@types/node/process.d.ts:287

___

### traceDeprecation

• **traceDeprecation**: *boolean*

Defined in: node_modules/@types/node/process.d.ts:339

___

### version

• **version**: *string*

Defined in: node_modules/@types/node/process.d.ts:256

___

### versions

• **versions**: [*ProcessVersions*](globalenv.nodejs.processversions.md)

Defined in: node_modules/@types/node/process.d.ts:257

## Methods

### abort

▸ **abort**(): *never*

**Returns:** *never*

Defined in: node_modules/@types/node/process.d.ts:221

___

### addListener

▸ **addListener**(`event`: ``"beforeExit"``, `listener`: [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `listener` | [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:342

▸ **addListener**(`event`: ``"disconnect"``, `listener`: [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |
| `listener` | [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:343

▸ **addListener**(`event`: ``"exit"``, `listener`: [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:344

▸ **addListener**(`event`: ``"rejectionHandled"``, `listener`: [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `listener` | [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:345

▸ **addListener**(`event`: ``"uncaughtException"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:346

▸ **addListener**(`event`: ``"uncaughtExceptionMonitor"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:347

▸ **addListener**(`event`: ``"unhandledRejection"``, `listener`: [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `listener` | [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:348

▸ **addListener**(`event`: ``"warning"``, `listener`: [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `listener` | [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:349

▸ **addListener**(`event`: ``"message"``, `listener`: [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:350

▸ **addListener**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `listener`: [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `listener` | [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:351

▸ **addListener**(`event`: ``"newListener"``, `listener`: [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `listener` | [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:352

▸ **addListener**(`event`: ``"removeListener"``, `listener`: [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `listener` | [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:353

▸ **addListener**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.addListener

Defined in: node_modules/@types/node/process.d.ts:354

___

### chdir

▸ **chdir**(`directory`: *string*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `directory` | *string* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:222

___

### cpuUsage

▸ **cpuUsage**(`previousValue?`: [*CpuUsage*](globalenv.nodejs.cpuusage.md)): [*CpuUsage*](globalenv.nodejs.cpuusage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `previousValue?` | [*CpuUsage*](globalenv.nodejs.cpuusage.md) |

**Returns:** [*CpuUsage*](globalenv.nodejs.cpuusage.md)

Defined in: node_modules/@types/node/process.d.ts:293

___

### cwd

▸ **cwd**(): *string*

**Returns:** *string*

Defined in: node_modules/@types/node/process.d.ts:223

___

### disconnect

▸ **disconnect**(): *void*

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:322

___

### emit

▸ **emit**(`event`: ``"beforeExit"``, `code`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `code` | *number* |

**Returns:** *boolean*

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:356

▸ **emit**(`event`: ``"disconnect"``): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:357

▸ **emit**(`event`: ``"exit"``, `code`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `code` | *number* |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:358

▸ **emit**(`event`: ``"rejectionHandled"``, `promise`: *Promise*<any\>): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `promise` | *Promise*<any\> |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:359

▸ **emit**(`event`: ``"uncaughtException"``, `error`: Error): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `error` | Error |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:360

▸ **emit**(`event`: ``"uncaughtExceptionMonitor"``, `error`: Error): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `error` | Error |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:361

▸ **emit**(`event`: ``"unhandledRejection"``, `reason`: *any*, `promise`: *Promise*<any\>): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `reason` | *any* |
| `promise` | *Promise*<any\> |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:362

▸ **emit**(`event`: ``"warning"``, `warning`: Error): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `warning` | Error |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:363

▸ **emit**(`event`: ``"message"``, `message`: *any*, `sendHandle`: *any*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `message` | *any* |
| `sendHandle` | *any* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:364

▸ **emit**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `signal`: [*Signals*](../modules/globalenv.nodejs.md#signals)): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `signal` | [*Signals*](../modules/globalenv.nodejs.md#signals) |

**Returns:** *boolean*

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:365

▸ **emit**(`event`: ``"newListener"``, `eventName`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `eventName` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:366

▸ **emit**(`event`: ``"removeListener"``, `eventName`: *string*, `listener`: (...`args`: *any*[]) => *void*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `eventName` | *string* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:367

▸ **emit**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.emit

Defined in: node_modules/@types/node/process.d.ts:368

___

### emitWarning

▸ **emitWarning**(`warning`: *string* \| Error, `ctor?`: Function): *void*

The `process.emitWarning()` method can be used to emit custom or application specific process warnings.

These can be listened for by adding a handler to the `'warning'` event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `warning` | *string* \| Error | The warning to emit. |
| `ctor?` | Function | When `warning` is a `string`, `ctor` is an optional function used to limit the generated stack trace. Default: `process.emitWarning`. |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:236

▸ **emitWarning**(`warning`: *string* \| Error, `type?`: *string*, `ctor?`: Function): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `warning` | *string* \| Error |
| `type?` | *string* |
| `ctor?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:237

▸ **emitWarning**(`warning`: *string* \| Error, `type?`: *string*, `code?`: *string*, `ctor?`: Function): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `warning` | *string* \| Error |
| `type?` | *string* |
| `code?` | *string* |
| `ctor?` | Function |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:238

▸ **emitWarning**(`warning`: *string* \| Error, `options?`: [*EmitWarningOptions*](globalenv.nodejs.emitwarningoptions.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `warning` | *string* \| Error |
| `options?` | [*EmitWarningOptions*](globalenv.nodejs.emitwarningoptions.md) |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:239

___

### eventNames

▸ **eventNames**(): (*string* \| *symbol*)[]

**Returns:** (*string* \| *symbol*)[]

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:76

___

### exit

▸ **exit**(`code?`: *number*): *never*

#### Parameters

| Name | Type |
| :------ | :------ |
| `code?` | *number* |

**Returns:** *never*

Defined in: node_modules/@types/node/process.d.ts:242

___

### getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:68

___

### getegid

▸ **getegid**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:250

___

### geteuid

▸ **geteuid**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:248

___

### getgid

▸ **getgid**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:244

___

### getgroups

▸ **getgroups**(): *number*[]

**Returns:** *number*[]

Defined in: node_modules/@types/node/process.d.ts:252

___

### getuid

▸ **getuid**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:246

___

### hasUncaughtExceptionCaptureCallback

▸ **hasUncaughtExceptionCaptureCallback**(): *boolean*

**Returns:** *boolean*

Defined in: node_modules/@types/node/process.d.ts:255

___

### kill

▸ **kill**(`pid`: *number*, `signal?`: *string* \| *number*): ``true``

#### Parameters

| Name | Type |
| :------ | :------ |
| `pid` | *number* |
| `signal?` | *string* \| *number* |

**Returns:** ``true``

Defined in: node_modules/@types/node/process.d.ts:284

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

▸ **listeners**(`event`: ``"beforeExit"``): [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |

**Returns:** [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)[]

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:427

▸ **listeners**(`event`: ``"disconnect"``): [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |

**Returns:** [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:428

▸ **listeners**(`event`: ``"exit"``): [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |

**Returns:** [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:429

▸ **listeners**(`event`: ``"rejectionHandled"``): [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |

**Returns:** [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:430

▸ **listeners**(`event`: ``"uncaughtException"``): [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |

**Returns:** [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:431

▸ **listeners**(`event`: ``"uncaughtExceptionMonitor"``): [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |

**Returns:** [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:432

▸ **listeners**(`event`: ``"unhandledRejection"``): [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |

**Returns:** [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:433

▸ **listeners**(`event`: ``"warning"``): [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |

**Returns:** [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:434

▸ **listeners**(`event`: ``"message"``): [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |

**Returns:** [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:435

▸ **listeners**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals)): [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |

**Returns:** [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:436

▸ **listeners**(`event`: ``"newListener"``): [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |

**Returns:** [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:437

▸ **listeners**(`event`: ``"removeListener"``): [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |

**Returns:** [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:438

▸ **listeners**(`event`: ``"multipleResolves"``): [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |

**Returns:** [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)[]

Overrides: EventEmitter.listeners

Defined in: node_modules/@types/node/process.d.ts:439

___

### memoryUsage

▸ **memoryUsage**(): [*MemoryUsage*](globalenv.nodejs.memoryusage.md)

**Returns:** [*MemoryUsage*](globalenv.nodejs.memoryusage.md)

Defined in: node_modules/@types/node/process.d.ts:292

___

### nextTick

▸ **nextTick**(`callback`: Function, ...`args`: *any*[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | Function |
| `...args` | *any*[] |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:294

___

### off

▸ **off**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:65

___

### on

▸ **on**(`event`: ``"beforeExit"``, `listener`: [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `listener` | [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:370

▸ **on**(`event`: ``"disconnect"``, `listener`: [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |
| `listener` | [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:371

▸ **on**(`event`: ``"exit"``, `listener`: [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:372

▸ **on**(`event`: ``"rejectionHandled"``, `listener`: [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `listener` | [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:373

▸ **on**(`event`: ``"uncaughtException"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:374

▸ **on**(`event`: ``"uncaughtExceptionMonitor"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:375

▸ **on**(`event`: ``"unhandledRejection"``, `listener`: [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `listener` | [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:376

▸ **on**(`event`: ``"warning"``, `listener`: [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `listener` | [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:377

▸ **on**(`event`: ``"message"``, `listener`: [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:378

▸ **on**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `listener`: [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `listener` | [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:379

▸ **on**(`event`: ``"newListener"``, `listener`: [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `listener` | [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:380

▸ **on**(`event`: ``"removeListener"``, `listener`: [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `listener` | [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:381

▸ **on**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:382

▸ **on**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.on

Defined in: node_modules/@types/node/process.d.ts:383

___

### once

▸ **once**(`event`: ``"beforeExit"``, `listener`: [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `listener` | [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:385

▸ **once**(`event`: ``"disconnect"``, `listener`: [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |
| `listener` | [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:386

▸ **once**(`event`: ``"exit"``, `listener`: [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:387

▸ **once**(`event`: ``"rejectionHandled"``, `listener`: [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `listener` | [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:388

▸ **once**(`event`: ``"uncaughtException"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:389

▸ **once**(`event`: ``"uncaughtExceptionMonitor"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:390

▸ **once**(`event`: ``"unhandledRejection"``, `listener`: [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `listener` | [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:391

▸ **once**(`event`: ``"warning"``, `listener`: [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `listener` | [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:392

▸ **once**(`event`: ``"message"``, `listener`: [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:393

▸ **once**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `listener`: [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `listener` | [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:394

▸ **once**(`event`: ``"newListener"``, `listener`: [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `listener` | [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:395

▸ **once**(`event`: ``"removeListener"``, `listener`: [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `listener` | [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:396

▸ **once**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.once

Defined in: node_modules/@types/node/process.d.ts:397

___

### openStdin

▸ **openStdin**(): [*Socket*](globalenv.nodejs.socket.md)

**Returns:** [*Socket*](globalenv.nodejs.socket.md)

Defined in: node_modules/@types/node/process.d.ts:216

___

### prependListener

▸ **prependListener**(`event`: ``"beforeExit"``, `listener`: [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `listener` | [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:399

▸ **prependListener**(`event`: ``"disconnect"``, `listener`: [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |
| `listener` | [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:400

▸ **prependListener**(`event`: ``"exit"``, `listener`: [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:401

▸ **prependListener**(`event`: ``"rejectionHandled"``, `listener`: [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `listener` | [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:402

▸ **prependListener**(`event`: ``"uncaughtException"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:403

▸ **prependListener**(`event`: ``"uncaughtExceptionMonitor"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:404

▸ **prependListener**(`event`: ``"unhandledRejection"``, `listener`: [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `listener` | [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:405

▸ **prependListener**(`event`: ``"warning"``, `listener`: [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `listener` | [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:406

▸ **prependListener**(`event`: ``"message"``, `listener`: [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:407

▸ **prependListener**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `listener`: [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `listener` | [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:408

▸ **prependListener**(`event`: ``"newListener"``, `listener`: [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `listener` | [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:409

▸ **prependListener**(`event`: ``"removeListener"``, `listener`: [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `listener` | [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:410

▸ **prependListener**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependListener

Defined in: node_modules/@types/node/process.d.ts:411

___

### prependOnceListener

▸ **prependOnceListener**(`event`: ``"beforeExit"``, `listener`: [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeExit"`` |
| `listener` | [*BeforeExitListener*](../modules/globalenv.nodejs.md#beforeexitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/process.d.ts:413

▸ **prependOnceListener**(`event`: ``"disconnect"``, `listener`: [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disconnect"`` |
| `listener` | [*DisconnectListener*](../modules/globalenv.nodejs.md#disconnectlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:414

▸ **prependOnceListener**(`event`: ``"exit"``, `listener`: [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"exit"`` |
| `listener` | [*ExitListener*](../modules/globalenv.nodejs.md#exitlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:415

▸ **prependOnceListener**(`event`: ``"rejectionHandled"``, `listener`: [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"rejectionHandled"`` |
| `listener` | [*RejectionHandledListener*](../modules/globalenv.nodejs.md#rejectionhandledlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:416

▸ **prependOnceListener**(`event`: ``"uncaughtException"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtException"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:417

▸ **prependOnceListener**(`event`: ``"uncaughtExceptionMonitor"``, `listener`: [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"uncaughtExceptionMonitor"`` |
| `listener` | [*UncaughtExceptionListener*](../modules/globalenv.nodejs.md#uncaughtexceptionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:418

▸ **prependOnceListener**(`event`: ``"unhandledRejection"``, `listener`: [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unhandledRejection"`` |
| `listener` | [*UnhandledRejectionListener*](../modules/globalenv.nodejs.md#unhandledrejectionlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:419

▸ **prependOnceListener**(`event`: ``"warning"``, `listener`: [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"warning"`` |
| `listener` | [*WarningListener*](../modules/globalenv.nodejs.md#warninglistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:420

▸ **prependOnceListener**(`event`: ``"message"``, `listener`: [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"message"`` |
| `listener` | [*MessageListener*](../modules/globalenv.nodejs.md#messagelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:421

▸ **prependOnceListener**(`event`: [*Signals*](../modules/globalenv.nodejs.md#signals), `listener`: [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*Signals*](../modules/globalenv.nodejs.md#signals) |
| `listener` | [*SignalsListener*](../modules/globalenv.nodejs.md#signalslistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:422

▸ **prependOnceListener**(`event`: ``"newListener"``, `listener`: [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"newListener"`` |
| `listener` | [*NewListenerListener*](../modules/globalenv.nodejs.md#newlistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:423

▸ **prependOnceListener**(`event`: ``"removeListener"``, `listener`: [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"removeListener"`` |
| `listener` | [*RemoveListenerListener*](../modules/globalenv.nodejs.md#removelistenerlistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:424

▸ **prependOnceListener**(`event`: ``"multipleResolves"``, `listener`: [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener)): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"multipleResolves"`` |
| `listener` | [*MultipleResolveListener*](../modules/globalenv.nodejs.md#multipleresolvelistener) |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Overrides: EventEmitter.prependOnceListener

Defined in: node_modules/@types/node/process.d.ts:425

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

▸ **removeAllListeners**(`event?`: *string* \| *symbol*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | *string* \| *symbol* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:66

___

### removeListener

▸ **removeListener**(`event`: *string* \| *symbol*, `listener`: (...`args`: *any*[]) => *void*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | *string* \| *symbol* |
| `listener` | (...`args`: *any*[]) => *void* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:64

___

### resourceUsage

▸ **resourceUsage**(): [*ResourceUsage*](globalenv.nodejs.resourceusage.md)

**Returns:** [*ResourceUsage*](globalenv.nodejs.resourceusage.md)

Defined in: node_modules/@types/node/process.d.ts:337

___

### send

▸ `Optional` **send**(`message`: *any*, `sendHandle?`: *any*, `options?`: { `swallowErrors?`: *boolean*  }, `callback?`: (`error`: ``null`` \| Error) => *void*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | *any* |
| `sendHandle?` | *any* |
| `options?` | *object* |
| `options.swallowErrors?` | *boolean* |
| `callback?` | (`error`: ``null`` \| Error) => *void* |

**Returns:** *boolean*

Defined in: node_modules/@types/node/process.d.ts:321

___

### setMaxListeners

▸ **setMaxListeners**(`n`: *number*): [*Process*](globalenv.nodejs.process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | *number* |

**Returns:** [*Process*](globalenv.nodejs.process.md)

Inherited from: [EventEmitter](globalenv.nodejs.eventemitter.md)

Defined in: node_modules/@types/node/events.d.ts:67

___

### setUncaughtExceptionCaptureCallback

▸ **setUncaughtExceptionCaptureCallback**(`cb`: ``null`` \| (`err`: Error) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | ``null`` \| (`err`: Error) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:254

___

### setegid

▸ **setegid**(`id`: *string* \| *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* \| *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:251

___

### seteuid

▸ **seteuid**(`id`: *string* \| *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* \| *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:249

___

### setgid

▸ **setgid**(`id`: *string* \| *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* \| *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:245

___

### setgroups

▸ **setgroups**(`groups`: readonly (*string* \| *number*)[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | readonly (*string* \| *number*)[] |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:253

___

### setuid

▸ **setuid**(`id`: *string* \| *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* \| *number* |

**Returns:** *void*

Defined in: node_modules/@types/node/process.d.ts:247

___

### umask

▸ **umask**(): *number*

**`deprecated`** since v14.0.0 - Calling process.umask() with no argument causes
the process-wide umask to be written twice. This introduces a race condition between threads,
and is a potential security vulnerability. There is no safe, cross-platform alternative API.

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:311

▸ **umask**(`mask`: *string* \| *number*): *number*

Can only be set if not in worker thread.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mask` | *string* \| *number* |

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:315

___

### uptime

▸ **uptime**(): *number*

**Returns:** *number*

Defined in: node_modules/@types/node/process.d.ts:316
