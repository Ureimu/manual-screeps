[manual-screeps](../README.md) / [Exports](../modules.md) / construct/type

# Module: construct/type

## Table of contents

### Interfaces

- [StructureInf](../interfaces/construct_type.structureinf.md)
- [constructMemory](../interfaces/construct_type.constructmemory.md)

### Type aliases

- [SiteState](construct_type.md#sitestate)
- [SpecifiedOutwardsStructureNameList](construct_type.md#specifiedoutwardsstructurenamelist)
- [SpecifiedStructureNameList](construct_type.md#specifiedstructurenamelist)
- [StructureTypeFromSpecifiedStructureName](construct_type.md#structuretypefromspecifiedstructurename)
- [formedLayout](construct_type.md#formedlayout)

### Functions

- [getStructureTypeBySpecifiedName](construct_type.md#getstructuretypebyspecifiedname)

## Type aliases

### SiteState

Ƭ **SiteState**: ``"blank"`` \| ``"site"`` \| ``"structure"``

Defined in: src/frame/construct/type.ts:49

___

### SpecifiedOutwardsStructureNameList

Ƭ **SpecifiedOutwardsStructureNameList**<T\>: T *extends* ``"container"`` ? ``"sourceContainer"`` \| ``"mineralContainer"`` : T *extends* ``"road"`` ? ``"outwardsSourceRoad"`` \| ``"passerbyRoad"`` \| ``"outwardsMineralRoad"`` : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | StructureConstant |

Defined in: src/frame/construct/type.ts:68

___

### SpecifiedStructureNameList

Ƭ **SpecifiedStructureNameList**<T\>: T *extends* ``"container"`` ? ``"sourceContainer"`` \| ``"controllerContainer"`` \| ``"mineralContainer"`` \| [*SpecifiedOutwardsStructureNameList*](construct_type.md#specifiedoutwardsstructurenamelist)<T\> : T *extends* ``"link"`` ? ``"sourceLink"`` \| ``"controllerLink"`` \| ``"centerLink"`` \| [*SpecifiedOutwardsStructureNameList*](construct_type.md#specifiedoutwardsstructurenamelist)<T\> : T *extends* ``"road"`` ? ``"baseRoad"`` \| ``"sourceAndControllerRoad"`` \| ``"mineralRoad"`` \| ``"aroundSpawnRoad"`` \| [*SpecifiedOutwardsStructureNameList*](construct_type.md#specifiedoutwardsstructurenamelist)<T\> : T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | StructureConstant |

Defined in: src/frame/construct/type.ts:51

___

### StructureTypeFromSpecifiedStructureName

Ƭ **StructureTypeFromSpecifiedStructureName**<T\>: T *extends* [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<``"container"``\> ? ``"container"`` : T *extends* [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<``"link"``\> ? ``"link"`` : T *extends* [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<``"road"``\> ? ``"road"`` : T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*SpecifiedStructureNameList*](construct_type.md#specifiedstructurenamelist)<StructureConstant\> |

Defined in: src/frame/construct/type.ts:59

___

### formedLayout

Ƭ **formedLayout**: { [structureName in BuildableStructureConstant]?: { [specifiedName in SpecifiedStructureNameList<structureName\>]?: object}}

Defined in: src/frame/construct/type.ts:25

## Functions

### getStructureTypeBySpecifiedName

▸ **getStructureTypeBySpecifiedName**<T\>(`name`: T): [*StructureTypeFromSpecifiedStructureName*](construct_type.md#structuretypefromspecifiedstructurename)<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | ``"extension"`` \| ``"rampart"`` \| ``"spawn"`` \| ``"constructedWall"`` \| ``"storage"`` \| ``"tower"`` \| ``"observer"`` \| ``"powerSpawn"`` \| ``"extractor"`` \| ``"lab"`` \| ``"terminal"`` \| ``"nuker"`` \| ``"factory"`` \| ``"outwardsSourceRoad"`` \| ``"passerbyRoad"`` \| ``"sourceContainer"`` \| ``"outwardsMineralRoad"`` \| ``"mineralContainer"`` \| ``"keeperLair"`` \| ``"controller"`` \| ``"powerBank"`` \| ``"portal"`` \| ``"invaderCore"`` \| ``"baseRoad"`` \| ``"sourceAndControllerRoad"`` \| ``"mineralRoad"`` \| ``"aroundSpawnRoad"`` \| ``"sourceLink"`` \| ``"controllerLink"`` \| ``"centerLink"`` \| ``"controllerContainer"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | T |

**Returns:** [*StructureTypeFromSpecifiedStructureName*](construct_type.md#structuretypefromspecifiedstructurename)<T\>

Defined in: src/frame/construct/type.ts:74
