[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / EmitWarningOptions

# Interface: EmitWarningOptions

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).EmitWarningOptions

## Table of contents

### Properties

- [code](globalenv.nodejs.emitwarningoptions.md#code)
- [ctor](globalenv.nodejs.emitwarningoptions.md#ctor)
- [detail](globalenv.nodejs.emitwarningoptions.md#detail)
- [type](globalenv.nodejs.emitwarningoptions.md#type)

## Properties

### code

• `Optional` **code**: *string*

A unique identifier for the warning instance being emitted.

Defined in: node_modules/@types/node/process.d.ts:185

___

### ctor

• `Optional` **ctor**: Function

When `warning` is a `string`, `ctor` is an optional function used to limit the generated stack trace.

**`default`** process.emitWarning

Defined in: node_modules/@types/node/process.d.ts:192

___

### detail

• `Optional` **detail**: *string*

Additional text to include with the error.

Defined in: node_modules/@types/node/process.d.ts:197

___

### type

• `Optional` **type**: *string*

When `warning` is a `string`, `type` is the name to use for the _type_ of warning being emitted.

**`default`** 'Warning'

Defined in: node_modules/@types/node/process.d.ts:180
