[manual-screeps](../README.md) / [Exports](../modules.md) / utils/mincut/minCut

# Module: utils/mincut/minCut

## Table of contents

### Classes

- [Graph](../classes/utils_mincut_mincut.graph.md)

### Interfaces

- [Edge](../interfaces/utils_mincut_mincut.edge.md)
- [Rectangle](../interfaces/utils_mincut_mincut.rectangle.md)

### Functions

- [coordToRoomPosition](utils_mincut_mincut.md#coordtoroomposition)
- [createGraph](utils_mincut_mincut.md#creategraph)
- [get2DArray](utils_mincut_mincut.md#get2darray)
- [getCutTiles](utils_mincut_mincut.md#getcuttiles)
- [getMinCut](utils_mincut_mincut.md#getmincut)
- [pruneDeadEnds](utils_mincut_mincut.md#prunedeadends)
- [testMinCutSubset](utils_mincut_mincut.md#testmincutsubset)

## Functions

### coordToRoomPosition

▸ **coordToRoomPosition**(`coordList`: Coord[], `roomName`: *string*): RoomPosition[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordList` | Coord[] |
| `roomName` | *string* |

**Returns:** RoomPosition[]

Defined in: src/utils/mincut/minCut.ts:629

___

### createGraph

▸ **createGraph**(`roomName`: *string*, `toProtect`: [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)[], `preferCloserBarriers?`: *boolean*, `preferCloserBarrierLimit?`: *number*, `visualize?`: *boolean*, `bounds?`: [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)): *void* \| [*Graph*](../classes/utils_mincut_mincut.graph.md)

Function to create Source, Sink, Tiles arrays: takes a rectangle-Array as input for Tiles that are to Protect

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `roomName` | *string* | - | - |
| `toProtect` | [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)[] | - | the coordinates to protect inside the walls |
| `preferCloserBarriers` | *boolean* | true | - |
| `preferCloserBarrierLimit` | *number* | - | - |
| `visualize` | *boolean* | true | - |
| `bounds` | [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md) | - | the area to consider for the minCut |

**Returns:** *void* \| [*Graph*](../classes/utils_mincut_mincut.graph.md)

Defined in: src/utils/mincut/minCut.ts:278

___

### get2DArray

▸ **get2DArray**(`roomName`: *string*, `bounds?`: [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)): *any*[][]

An Array with Terrain information: -1 not usable, 2 Sink (Leads to Exit)

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomName` | *string* |
| `bounds` | [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md) |

**Returns:** *any*[][]

Defined in: src/utils/mincut/minCut.ts:216

___

### getCutTiles

▸ **getCutTiles**(`roomName`: *string*, `toProtect`: [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)[], `preferCloserBarriers?`: *boolean*, `preferCloserBarrierLimit?`: *number*, `visualize?`: *boolean*, `bounds?`: [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)): Coord[]

Main function to be called by user: calculate min cut tiles from room using rectangles as protected areas

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `roomName` | *string* | - | - |
| `toProtect` | [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md)[] | - | - |
| `preferCloserBarriers` | *boolean* | true | - |
| `preferCloserBarrierLimit` | *number* | - | - |
| `visualize` | *boolean* | true | - |
| `bounds` | [*Rectangle*](../interfaces/utils_mincut_mincut.rectangle.md) | - | the area to be considered for the minCut |

**Returns:** Coord[]

Defined in: src/utils/mincut/minCut.ts:435

___

### getMinCut

▸ **getMinCut**(`colonyName`: *string*, `preferCloserBarriers?`: *boolean*): RoomPosition[]

Example function: demonstrates how to get a min cut with 2 rectangles, which define a "to protect" area

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `colonyName` | *string* | - |
| `preferCloserBarriers` | *boolean* | true |

**Returns:** RoomPosition[]

Defined in: src/utils/mincut/minCut.ts:571

___

### pruneDeadEnds

▸ **pruneDeadEnds**(`roomName`: *string*, `cutTiles`: Coord[]): Coord[]

Removes unnecessary tiles if they are blocking the path to a dead end
Useful if minCut has been run on a subset of the room

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roomName` | *string* | Room to work in |
| `cutTiles` | Coord[] | Array of tiles which are in the minCut |

**Returns:** Coord[]

Defined in: src/utils/mincut/minCut.ts:487

___

### testMinCutSubset

▸ **testMinCutSubset**(`colonyName`: *string*): *string*

Example function: demonstrates how to get a min cut with 2 rectangles, which define a "to protect" area
while considering a subset of the larger room.

#### Parameters

| Name | Type |
| :------ | :------ |
| `colonyName` | *string* |

**Returns:** *string*

Defined in: src/utils/mincut/minCut.ts:642
