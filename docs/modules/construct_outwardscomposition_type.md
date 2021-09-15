[manual-screeps](../README.md) / [Exports](../modules.md) / construct/outwardsComposition/type

# Module: construct/outwardsComposition/type

## Table of contents

### Interfaces

- [mineralContainerLayoutData](../interfaces/construct_outwardscomposition_type.mineralcontainerlayoutdata.md)
- [outwardsMineralRoadLayoutData](../interfaces/construct_outwardscomposition_type.outwardsmineralroadlayoutdata.md)
- [passerbyRoadLayoutData](../interfaces/construct_outwardscomposition_type.passerbyroadlayoutdata.md)
- [sourceContainerLayoutData](../interfaces/construct_outwardscomposition_type.sourcecontainerlayoutdata.md)
- [sourceRoadLayoutData](../interfaces/construct_outwardscomposition_type.sourceroadlayoutdata.md)

### Type aliases

- [LayoutInputData](construct_outwardscomposition_type.md#layoutinputdata)
- [SpecifiedLayoutInputData](construct_outwardscomposition_type.md#specifiedlayoutinputdata)

## Type aliases

### LayoutInputData

Ƭ **LayoutInputData**: [*sourceRoadLayoutData*](../interfaces/construct_outwardscomposition_type.sourceroadlayoutdata.md) \| [*passerbyRoadLayoutData*](../interfaces/construct_outwardscomposition_type.passerbyroadlayoutdata.md) \| [*sourceContainerLayoutData*](../interfaces/construct_outwardscomposition_type.sourcecontainerlayoutdata.md) \| [*outwardsMineralRoadLayoutData*](../interfaces/construct_outwardscomposition_type.outwardsmineralroadlayoutdata.md) \| [*mineralContainerLayoutData*](../interfaces/construct_outwardscomposition_type.mineralcontainerlayoutdata.md)

Defined in: src/frame/construct/outwardsComposition/type.ts:45

___

### SpecifiedLayoutInputData

Ƭ **SpecifiedLayoutInputData**<T\>: T *extends* ``"outwardsSourceRoad"`` ? [*sourceRoadLayoutData*](../interfaces/construct_outwardscomposition_type.sourceroadlayoutdata.md) : T *extends* ``"sourceContainer"`` ? [*sourceContainerLayoutData*](../interfaces/construct_outwardscomposition_type.sourcecontainerlayoutdata.md) : T *extends* ``"passerbyRoad"`` ? [*passerbyRoadLayoutData*](../interfaces/construct_outwardscomposition_type.passerbyroadlayoutdata.md) : T *extends* ``"outwardsMineralRoad"`` ? [*outwardsMineralRoadLayoutData*](../interfaces/construct_outwardscomposition_type.outwardsmineralroadlayoutdata.md) : T *extends* ``"mineralContainer"`` ? [*mineralContainerLayoutData*](../interfaces/construct_outwardscomposition_type.mineralcontainerlayoutdata.md) : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*SpecifiedOutwardsStructureNameList*](construct_type.md#specifiedoutwardsstructurenamelist)<BuildableStructureConstant\> |

Defined in: src/frame/construct/outwardsComposition/type.ts:52
