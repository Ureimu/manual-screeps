[manual-screeps](../README.md) / [Exports](../modules.md) / construct/utils

# Module: construct/utils

## Table of contents

### Type aliases

- [RequireStructureData](construct_utils.md#requirestructuredata)

### Functions

- [getMyStructuresById](construct_utils.md#getmystructuresbyid)
- [getStructureIdList](construct_utils.md#getstructureidlist)
- [getStructureMemory](construct_utils.md#getstructurememory)

## Type aliases

### RequireStructureData

Ƭ **RequireStructureData**: { [structureType in SpecifiedStructureNameList<BuildableStructureConstant\>]?: object}

Defined in: src/frame/construct/utils/index.ts:17

## Functions

### getMyStructuresById

▸ **getMyStructuresById**<T\>(`structureIdList`: { `id`: *Id*<T\>  }[]): (T \| ``null``)[]

传入具有id属性的对象列表，返回对应建筑列表

**`export`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | AnyStructure |

#### Parameters

| Name | Type |
| :------ | :------ |
| `structureIdList` | { `id`: *Id*<T\>  }[] |

**Returns:** (T \| ``null``)[]

Defined in: src/frame/construct/utils/index.ts:106

___

### getStructureIdList

▸ **getStructureIdList**<T\>(`creep`: Creep, `roomName`: *string*, `requireStructureList`: T): *ReturnStructureList*<T\>

获取某种建筑的id与pos列表。会自动缓存列表并返回缓存。
如果获取的建筑属于自己，可以使用Game.structures来索引到对应建筑，这样更加节省cpu。
```ts
const myStructure = Game.structures(structureId)
```

**`export`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*RequireStructureData*](construct_utils.md#requirestructuredata) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |
| `roomName` | *string* |
| `requireStructureList` | T |

**Returns:** *ReturnStructureList*<T\>

Defined in: src/frame/construct/utils/index.ts:44

___

### getStructureMemory

▸ **getStructureMemory**<T\>(`roomName`: *string*, `structureType`: T, `structureSpecifiedName`: [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<T\>): [*StructureInf*](../interfaces/construct_type.structureinf.md)<T\>[``"memory"``] \| *undefined*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | StructureConstant |

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomName` | *string* |
| `structureType` | T |
| `structureSpecifiedName` | [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<T\> |

**Returns:** [*StructureInf*](../interfaces/construct_type.structureinf.md)<T\>[``"memory"``] \| *undefined*

Defined in: src/frame/construct/utils/index.ts:8
