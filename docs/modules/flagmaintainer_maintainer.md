[manual-screeps](../README.md) / [Exports](../modules.md) / flagMaintainer/maintainer

# Module: flagMaintainer/maintainer

## Table of contents

### Variables

- [constructionSiteRegExp](flagmaintainer_maintainer.md#constructionsiteregexp)
- [flagNameRegExp](flagmaintainer_maintainer.md#flagnameregexp)

### Functions

- [createFlagList](flagmaintainer_maintainer.md#createflaglist)
- [getFlagList](flagmaintainer_maintainer.md#getflaglist)
- [maintainPos](flagmaintainer_maintainer.md#maintainpos)

## Variables

### constructionSiteRegExp

• `Const` **constructionSiteRegExp**: *RegExp*

Defined in: src/flagMaintainer/maintainer.ts:9

___

### flagNameRegExp

• `Const` **flagNameRegExp**: *RegExp*

Defined in: src/flagMaintainer/maintainer.ts:8

## Functions

### createFlagList

▸ **createFlagList**<T\>(`room`: Room, `typeList`: T[]): *Record*<T, string[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectPosType*](flagmaintainer.md#objectpostype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | T[] |

**Returns:** *Record*<T, string[]\>

Defined in: src/flagMaintainer/maintainer.ts:52

___

### getFlagList

▸ **getFlagList**<T\>(`room`: Room, `typeList`: T[]): *Record*<T, string[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectPosType*](flagmaintainer.md#objectpostype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | T[] |

**Returns:** *Record*<T, string[]\>

Defined in: src/flagMaintainer/maintainer.ts:57

___

### maintainPos

▸ **maintainPos**(`room`: Room, `typeList`: [*ObjectPosType*](flagmaintainer.md#objectpostype)[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | [*ObjectPosType*](flagmaintainer.md#objectpostype)[] |

**Returns:** *void*

Defined in: src/flagMaintainer/maintainer.ts:11
