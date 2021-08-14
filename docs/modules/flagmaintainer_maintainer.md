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

Defined in: src/frame/flagMaintainer/maintainer.ts:6

___

### flagNameRegExp

• `Const` **flagNameRegExp**: *RegExp*

Defined in: src/frame/flagMaintainer/maintainer.ts:5

## Functions

### createFlagList

▸ **createFlagList**<T\>(`room`: Room, `typeList`: T[]): *Record*<T, string[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectPosType*](flagmaintainer_type.md#objectpostype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | T[] |

**Returns:** *Record*<T, string[]\>

Defined in: src/frame/flagMaintainer/maintainer.ts:49

___

### getFlagList

▸ **getFlagList**<T\>(`room`: Room, `typeList`: T[]): *Record*<T, string[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*ObjectPosType*](flagmaintainer_type.md#objectpostype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | T[] |

**Returns:** *Record*<T, string[]\>

Defined in: src/frame/flagMaintainer/maintainer.ts:54

___

### maintainPos

▸ **maintainPos**(`room`: Room, `typeList`: [*ObjectPosType*](flagmaintainer_type.md#objectpostype)[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `typeList` | [*ObjectPosType*](flagmaintainer_type.md#objectpostype)[] |

**Returns:** *void*

Defined in: src/frame/flagMaintainer/maintainer.ts:8
