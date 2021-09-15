[manual-screeps](../README.md) / [Exports](../modules.md) / oldConstruct/type

# Module: oldConstruct/type

## Table of contents

### Interfaces

- [StructureInf](../interfaces/oldconstruct_type.structureinf.md)
- [constructMemory](../interfaces/oldconstruct_type.constructmemory.md)

### Type aliases

- [SiteState](oldconstruct_type.md#sitestate)
- [SpecifiedOutwardsStructureNameList](oldconstruct_type.md#specifiedoutwardsstructurenamelist)
- [SpecifiedStructureNameList](oldconstruct_type.md#specifiedstructurenamelist)
- [StructureTypeFromSpecifiedStructureName](oldconstruct_type.md#structuretypefromspecifiedstructurename)
- [formedLayout](oldconstruct_type.md#formedlayout)

### Functions

- [getStructureTypeBySpecifiedName](oldconstruct_type.md#getstructuretypebyspecifiedname)

## Type aliases

### SiteState

Ƭ **SiteState**: ``"blank"`` \| ``"site"`` \| ``"structure"``

Defined in: src/frame/oldConstruct/type.ts:49

___

### SpecifiedOutwardsStructureNameList

Ƭ **SpecifiedOutwardsStructureNameList**<T\>: T *extends* ``"container"`` ? ``"sourceContainer"`` \| ``"mineralContainer"`` : T *extends* ``"road"`` ? ``"outwardsSourceRoad"`` \| ``"passerbyRoad"`` \| ``"outwardsMineralRoad"`` : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | StructureConstant |

Defined in: src/frame/oldConstruct/type.ts:68

___

### SpecifiedStructureNameList

Ƭ **SpecifiedStructureNameList**<T\>: T *extends* ``"container"`` ? ``"sourceContainer"`` \| ``"controllerContainer"`` \| ``"mineralContainer"`` \| [*SpecifiedOutwardsStructureNameList*](oldconstruct_type.md#specifiedoutwardsstructurenamelist)<T\> : T *extends* ``"link"`` ? ``"sourceLink"`` \| ``"controllerLink"`` \| ``"centerLink"`` \| [*SpecifiedOutwardsStructureNameList*](oldconstruct_type.md#specifiedoutwardsstructurenamelist)<T\> : T *extends* ``"road"`` ? ``"baseRoad"`` \| ``"sourceAndControllerRoad"`` \| ``"mineralRoad"`` \| ``"aroundSpawnRoad"`` \| [*SpecifiedOutwardsStructureNameList*](oldconstruct_type.md#specifiedoutwardsstructurenamelist)<T\> : T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | StructureConstant |

Defined in: src/frame/oldConstruct/type.ts:51

___

### StructureTypeFromSpecifiedStructureName

Ƭ **StructureTypeFromSpecifiedStructureName**<T\>: T *extends* [*SpecifiedStructureNameList*](oldconstruct_type.md#specifiedstructurenamelist)<``"container"``\> ? ``"container"`` : T *extends* [*SpecifiedStructureNameList*](oldconstruct_type.md#specifiedstructurenamelist)<``"link"``\> ? ``"link"`` : T *extends* [*SpecifiedStructureNameList*](oldconstruct_type.md#specifiedstructurenamelist)<``"road"``\> ? ``"road"`` : T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*SpecifiedStructureNameList*](oldconstruct_type.md#specifiedstructurenamelist)<StructureConstant\> |

Defined in: src/frame/oldConstruct/type.ts:59

___

### formedLayout

Ƭ **formedLayout**: { [structureName in BuildableStructureConstant]?: { [specifiedName in SpecifiedStructureNameList<structureName\>]?: object}}

Defined in: src/frame/oldConstruct/type.ts:25

## Functions

### getStructureTypeBySpecifiedName

▸ **getStructureTypeBySpecifiedName**<T\>(`name`: T): [*StructureTypeFromSpecifiedStructureName*](oldconstruct_type.md#structuretypefromspecifiedstructurename)<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | ``"extension"`` \| ``"rampart"`` \| ``"spawn"`` \| ``"constructedWall"`` \| ``"storage"`` \| ``"tower"`` \| ``"observer"`` \| ``"powerSpawn"`` \| ``"extractor"`` \| ``"lab"`` \| ``"terminal"`` \| ``"nuker"`` \| ``"factory"`` \| ``"outwardsSourceRoad"`` \| ``"passerbyRoad"`` \| ``"sourceContainer"`` \| ``"outwardsMineralRoad"`` \| ``"mineralContainer"`` \| ``"keeperLair"`` \| ``"controller"`` \| ``"powerBank"`` \| ``"portal"`` \| ``"invaderCore"`` \| ``"baseRoad"`` \| ``"sourceAndControllerRoad"`` \| ``"mineralRoad"`` \| ``"aroundSpawnRoad"`` \| ``"sourceLink"`` \| ``"controllerLink"`` \| ``"centerLink"`` \| ``"controllerContainer"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | T |

**Returns:** [*StructureTypeFromSpecifiedStructureName*](oldconstruct_type.md#structuretypefromspecifiedstructurename)<T\>

Defined in: src/frame/oldConstruct/type.ts:74
