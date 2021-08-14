[manual-screeps](../README.md) / [Exports](../modules.md) / [flagMaintainer](../modules/flagmaintainer.md) / FlagMaintainer

# Class: FlagMaintainer

[flagMaintainer](../modules/flagmaintainer.md).FlagMaintainer

## Table of contents

### Constructors

- [constructor](flagmaintainer.flagmaintainer-1.md#constructor)

### Methods

- [getTypeList](flagmaintainer.flagmaintainer-1.md#gettypelist)
- [refresh](flagmaintainer.flagmaintainer-1.md#refresh)

## Constructors

### constructor

\+ **new FlagMaintainer**(): [*FlagMaintainer*](flagmaintainer.flagmaintainer-1.md)

**Returns:** [*FlagMaintainer*](flagmaintainer.flagmaintainer-1.md)

## Methods

### getTypeList

▸ `Static` **getTypeList**(`typeList`: [*ObjectPosType*](../modules/flagmaintainer_type.md#objectpostype)[]): *string*

给refresh传参typeList时请务必使用该函数以获得完全的代码补全提示

**`memberof`** posMaintainer

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeList` | [*ObjectPosType*](../modules/flagmaintainer_type.md#objectpostype)[] |

**Returns:** *string*

Defined in: src/frame/flagMaintainer/index.ts:25

___

### refresh

▸ `Static` **refresh**(`args`: { `roomName`: *string* ; `typeList`: *string*  }): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.roomName` | *string* |
| `args.typeList` | *string* |

**Returns:** *string*

Defined in: src/frame/flagMaintainer/index.ts:8
