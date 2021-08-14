[manual-screeps](../README.md) / [Exports](../modules.md) / construct/composition/gridLayout

# Module: construct/composition/gridLayout

## Table of contents

### Variables

- [gridLayoutBuildNumberLimit](construct_composition_gridlayout.md#gridlayoutbuildnumberlimit)

### Functions

- [getGridLayout](construct_composition_gridlayout.md#getgridlayout)
- [ifEnoughSpace](construct_composition_gridlayout.md#ifenoughspace)

## Variables

### gridLayoutBuildNumberLimit

• `Const` **gridLayoutBuildNumberLimit**: *Record*<BuildableStructureConstant, { [level: number]: *number*;  }\>

Defined in: src/frame/construct/composition/gridLayout/index.ts:14

## Functions

### getGridLayout

▸ **getGridLayout**(`room`: Room): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |

**Returns:** *void*

Defined in: src/frame/construct/composition/gridLayout/index.ts:166

___

### ifEnoughSpace

▸ **ifEnoughSpace**(`room`: Room, `firstSpawnPos`: *string*, `opts?`: { `useRoomFind`: *boolean*  }): { `buildingExpand`: *Set*<string\> ; `roadExpand`: *Set*<string\>  } \| *undefined*

#### Parameters

| Name | Type |
| :------ | :------ |
| `room` | Room |
| `firstSpawnPos` | *string* |
| `opts?` | *object* |
| `opts.useRoomFind` | *boolean* |

**Returns:** { `buildingExpand`: *Set*<string\> ; `roadExpand`: *Set*<string\>  } \| *undefined*

Defined in: src/frame/construct/composition/gridLayout/index.ts:39
