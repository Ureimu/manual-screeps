[manual-screeps](../README.md) / [Exports](../modules.md) / construction

# Module: construction

## Table of contents

### Interfaces

- [constructionScheduleElement](../interfaces/construction.constructionscheduleelement.md)
- [constructionSitesInf](../interfaces/construction.constructionsitesinf.md)

### Type aliases

- [RoomPositionStr](construction.md#roompositionstr)
- [formedLayout](construction.md#formedlayout)

### Functions

- [autoConstruction](construction.md#autoconstruction)
- [callOnStart](construction.md#callonstart)

## Type aliases

### RoomPositionStr

Ƭ **RoomPositionStr**: *string*

RoomPosition字符串，格式为x0y0rE0S0

Defined in: src/construction/index.ts:59

___

### formedLayout

Ƭ **formedLayout**: { [structureName in BuildableStructureConstant]?: object}

Defined in: src/construction/index.ts:50

## Functions

### autoConstruction

▸ **autoConstruction**(`room`: Room): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |

**Returns:** *void*

Defined in: src/construction/index.ts:82

___

### callOnStart

▸ **callOnStart**(`room`: Room): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |

**Returns:** *void*

Defined in: src/construction/index.ts:5
