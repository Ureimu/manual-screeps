[manual-screeps](../README.md) / [Exports](../modules.md) / construction/composition/gridLayout

# Module: construction/composition/gridLayout

## Table of contents

### Functions

- [getGridLayout](construction_composition_gridlayout.md#getgridlayout)
- [ifEnoughSpace](construction_composition_gridlayout.md#ifenoughspace)

## Functions

### getGridLayout

▸ **getGridLayout**(`room`: Room): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |

**Returns:** *void*

Defined in: src/construction/composition/gridLayout.ts:168

___

### ifEnoughSpace

▸ **ifEnoughSpace**(`room`: Room, `firstSpawnPos`: [*RoomPositionStr*](construction.md#roompositionstr), `opts?`: { `useRoomFind`: *boolean*  }): { `buildingExpand`: *Set*<string\> ; `roadExpand`: *Set*<string\>  } \| *undefined*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `firstSpawnPos` | [*RoomPositionStr*](construction.md#roompositionstr) |
| `opts?` | *object* |
| `opts.useRoomFind` | *boolean* |

**Returns:** { `buildingExpand`: *Set*<string\> ; `roadExpand`: *Set*<string\>  } \| *undefined*

Defined in: src/construction/composition/gridLayout.ts:42
