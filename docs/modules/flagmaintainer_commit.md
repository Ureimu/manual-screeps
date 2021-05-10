[manual-screeps](../README.md) / [Exports](../modules.md) / flagMaintainer/commit

# Module: flagMaintainer/commit

## Table of contents

### Variables

- [posMaintainerCommit](flagmaintainer_commit.md#posmaintainercommit)

### Functions

- [getTypeList](flagmaintainer_commit.md#gettypelist)

## Variables

### posMaintainerCommit

• `Const` **posMaintainerCommit**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `refresh` | (`args`: { `roomName`: *string* ; `typeList`: *string*  }) => *string* |

Defined in: src/flagMaintainer/commit.ts:7

## Functions

### getTypeList

▸ **getTypeList**(`typeList`: [*ObjectPosType*](flagmaintainer.md#objectpostype)[]): *string*

给refresh传参typeList时请务必使用该函数以获得完全的代码补全提示

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeList` | [*ObjectPosType*](flagmaintainer.md#objectpostype)[] |

**Returns:** *string*

Defined in: src/flagMaintainer/commit.ts:26
