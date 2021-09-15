[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / ProcessReport

# Interface: ProcessReport

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).ProcessReport

## Table of contents

### Properties

- [directory](globalenv.nodejs.processreport.md#directory)
- [filename](globalenv.nodejs.processreport.md#filename)
- [reportOnFatalError](globalenv.nodejs.processreport.md#reportonfatalerror)
- [reportOnSignal](globalenv.nodejs.processreport.md#reportonsignal)
- [reportOnUncaughtException](globalenv.nodejs.processreport.md#reportonuncaughtexception)
- [signal](globalenv.nodejs.processreport.md#signal)

### Methods

- [getReport](globalenv.nodejs.processreport.md#getreport)
- [writeReport](globalenv.nodejs.processreport.md#writereport)

## Properties

### directory

• **directory**: *string*

Directory where the report is written.
working directory of the Node.js process.

**`default`** '' indicating that reports are written to the current

Defined in: node_modules/@types/node/globals.d.ts:708

___

### filename

• **filename**: *string*

Filename where the report is written.
The default value is the empty string.

**`default`** '' the output filename will be comprised of a timestamp,
PID, and sequence number.

Defined in: node_modules/@types/node/globals.d.ts:716

___

### reportOnFatalError

• **reportOnFatalError**: *boolean*

If true, a diagnostic report is generated on fatal errors,
such as out of memory errors or failed C++ assertions.

**`default`** false

Defined in: node_modules/@types/node/globals.d.ts:729

___

### reportOnSignal

• **reportOnSignal**: *boolean*

If true, a diagnostic report is generated when the process
receives the signal specified by process.report.signal.

**`defaul`** false

Defined in: node_modules/@types/node/globals.d.ts:736

___

### reportOnUncaughtException

• **reportOnUncaughtException**: *boolean*

If true, a diagnostic report is generated on uncaught exception.

**`default`** false

Defined in: node_modules/@types/node/globals.d.ts:742

___

### signal

• **signal**: [*Signals*](../modules/globalenv.nodejs.md#signals)

The signal used to trigger the creation of a diagnostic report.

**`default`** 'SIGUSR2'

Defined in: node_modules/@types/node/globals.d.ts:748

## Methods

### getReport

▸ **getReport**(`err?`: Error): *string*

Returns a JSON-formatted diagnostic report for the running process.
The report's JavaScript stack trace is taken from err, if present.

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | Error |

**Returns:** *string*

Defined in: node_modules/@types/node/globals.d.ts:722

___

### writeReport

▸ **writeReport**(`fileName?`: *string*): *string*

Writes a diagnostic report to a file. If filename is not provided, the default filename
includes the date, time, PID, and a sequence number.
The report's JavaScript stack trace is taken from err, if present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileName?` | *string* | Name of the file where the report is written. This should be a relative path, that will be appended to the directory specified in `process.report.directory`, or the current working directory of the Node.js process, if unspecified. |

**Returns:** *string*

Filename of the generated report.

Defined in: node_modules/@types/node/globals.d.ts:762

▸ **writeReport**(`error?`: Error): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | Error |

**Returns:** *string*

Defined in: node_modules/@types/node/globals.d.ts:763

▸ **writeReport**(`fileName?`: *string*, `err?`: Error): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName?` | *string* |
| `err?` | Error |

**Returns:** *string*

Defined in: node_modules/@types/node/globals.d.ts:764
