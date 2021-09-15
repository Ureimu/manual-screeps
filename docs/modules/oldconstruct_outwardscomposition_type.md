[manual-screeps](../README.md) / [Exports](../modules.md) / oldConstruct/outwardsComposition/type

# Module: oldConstruct/outwardsComposition/type

## Table of contents

### Interfaces

- [mineralContainerLayoutData](../interfaces/oldconstruct_outwardscomposition_type.mineralcontainerlayoutdata.md)
- [outwardsMineralRoadLayoutData](../interfaces/oldconstruct_outwardscomposition_type.outwardsmineralroadlayoutdata.md)
- [passerbyRoadLayoutData](../interfaces/oldconstruct_outwardscomposition_type.passerbyroadlayoutdata.md)
- [sourceContainerLayoutData](../interfaces/oldconstruct_outwardscomposition_type.sourcecontainerlayoutdata.md)
- [sourceRoadLayoutData](../interfaces/oldconstruct_outwardscomposition_type.sourceroadlayoutdata.md)

### Type aliases

- [LayoutInputData](oldconstruct_outwardscomposition_type.md#layoutinputdata)
- [SpecifiedLayoutInputData](oldconstruct_outwardscomposition_type.md#specifiedlayoutinputdata)

## Type aliases

### LayoutInputData

Ƭ **LayoutInputData**: [*sourceRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.sourceroadlayoutdata.md) \| [*passerbyRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.passerbyroadlayoutdata.md) \| [*sourceContainerLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.sourcecontainerlayoutdata.md) \| [*outwardsMineralRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.outwardsmineralroadlayoutdata.md) \| [*mineralContainerLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.mineralcontainerlayoutdata.md)

Defined in: src/frame/oldConstruct/outwardsComposition/type.ts:45

___

### SpecifiedLayoutInputData

Ƭ **SpecifiedLayoutInputData**<T\>: T *extends* ``"outwardsSourceRoad"`` ? [*sourceRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.sourceroadlayoutdata.md) : T *extends* ``"sourceContainer"`` ? [*sourceContainerLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.sourcecontainerlayoutdata.md) : T *extends* ``"passerbyRoad"`` ? [*passerbyRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.passerbyroadlayoutdata.md) : T *extends* ``"outwardsMineralRoad"`` ? [*outwardsMineralRoadLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.outwardsmineralroadlayoutdata.md) : T *extends* ``"mineralContainer"`` ? [*mineralContainerLayoutData*](../interfaces/oldconstruct_outwardscomposition_type.mineralcontainerlayoutdata.md) : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*SpecifiedOutwardsStructureNameList*](construct_type.md#specifiedoutwardsstructurenamelist)<BuildableStructureConstant\> |

Defined in: src/frame/oldConstruct/outwardsComposition/type.ts:52
