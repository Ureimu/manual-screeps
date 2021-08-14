[manual-screeps](../README.md) / [Exports](../modules.md) / construct/type

# Module: construct/type

## Table of contents

### Interfaces

- [constructMemory](../interfaces/construct_type.constructmemory.md)
- [constructionSiteInf](../interfaces/construct_type.constructionsiteinf.md)

### Type aliases

- [SiteState](construct_type.md#sitestate)
- [SpecifiedStructureNameList](construct_type.md#specifiedstructurenamelist)
- [formedLayout](construct_type.md#formedlayout)

## Type aliases

### SiteState

Ƭ **SiteState**: ``"blank"`` \| ``"site"`` \| ``"structure"``

Defined in: src/frame/construct/type.ts:49

___

### SpecifiedStructureNameList

Ƭ **SpecifiedStructureNameList**<T\>: T *extends* ``"container"`` ? ``"sourceContainer"`` \| ``"controllerContainer"`` \| ``"mineralContainer"`` : T *extends* ``"link"`` ? ``"sourceLink"`` \| ``"controllerLink"`` \| ``"centerLink"`` : T *extends* ``"road"`` ? ``"baseRoad"`` \| ``"sourceAndControllerRoad"`` \| ``"mineralRoad"`` \| ``"aroundSpawnRoad"`` \| ``"outwardsSourceRoad"`` \| ``"passerbyRoad"`` : T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | BuildableStructureConstant |

Defined in: src/frame/construct/type.ts:51

___

### formedLayout

Ƭ **formedLayout**: { [structureName in BuildableStructureConstant]?: { [specifiedName in SpecifiedStructureNameList<structureName\>]?: object}}

Defined in: src/frame/construct/type.ts:25
