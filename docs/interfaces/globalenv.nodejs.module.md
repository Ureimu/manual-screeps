[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / Module

# Interface: Module

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).Module

## Table of contents

### Properties

- [children](globalenv.nodejs.module.md#children)
- [exports](globalenv.nodejs.module.md#exports)
- [filename](globalenv.nodejs.module.md#filename)
- [id](globalenv.nodejs.module.md#id)
- [loaded](globalenv.nodejs.module.md#loaded)
- [parent](globalenv.nodejs.module.md#parent)
- [path](globalenv.nodejs.module.md#path)
- [paths](globalenv.nodejs.module.md#paths)
- [require](globalenv.nodejs.module.md#require)

## Properties

### children

• **children**: [*Module*](globalenv.nodejs.module.md)[]

Defined in: node_modules/@types/node/globals.d.ts:632

___

### exports

• **exports**: *any*

Defined in: node_modules/@types/node/globals.d.ts:625

___

### filename

• **filename**: *string*

Defined in: node_modules/@types/node/globals.d.ts:628

___

### id

• **id**: *string*

Defined in: node_modules/@types/node/globals.d.ts:627

___

### loaded

• **loaded**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:629

___

### parent

• **parent**: *undefined* \| ``null`` \| [*Module*](globalenv.nodejs.module.md)

**`deprecated`** since 14.6.0 Please use `require.main` and `module.children` instead.

Defined in: node_modules/@types/node/globals.d.ts:631

___

### path

• **path**: *string*

**`since`** 11.14.0

The directory name of the module. This is usually the same as the path.dirname() of the module.id.

Defined in: node_modules/@types/node/globals.d.ts:638

___

### paths

• **paths**: *string*[]

Defined in: node_modules/@types/node/globals.d.ts:639

___

### require

• **require**: [*Require*](globalenv.nodejs.require.md)

Defined in: node_modules/@types/node/globals.d.ts:626
