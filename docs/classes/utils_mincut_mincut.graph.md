[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/mincut/minCut](../modules/utils_mincut_mincut.md) / Graph

# Class: Graph

[utils/mincut/minCut](../modules/utils_mincut_mincut.md).Graph

## Table of contents

### Constructors

- [constructor](utils_mincut_mincut.graph.md#constructor)

### Properties

- [edges](utils_mincut_mincut.graph.md#edges)
- [level](utils_mincut_mincut.graph.md#level)
- [totalVertices](utils_mincut_mincut.graph.md#totalvertices)

### Methods

- [calcFlow](utils_mincut_mincut.graph.md#calcflow)
- [calcMinCut](utils_mincut_mincut.graph.md#calcmincut)
- [createLevelGraph](utils_mincut_mincut.graph.md#createlevelgraph)
- [getMinCut](utils_mincut_mincut.graph.md#getmincut)
- [newEdge](utils_mincut_mincut.graph.md#newedge)

## Constructors

### constructor

\+ **new Graph**(`totalVertices`: *number*): [*Graph*](utils_mincut_mincut.graph.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `totalVertices` | *number* |

**Returns:** [*Graph*](utils_mincut_mincut.graph.md)

Defined in: src/utils/mincut/minCut.ts:60

## Properties

### edges

• `Private` **edges**: *object*

#### Type declaration

Defined in: src/utils/mincut/minCut.ts:60

___

### level

• `Private` **level**: *number*[]

Defined in: src/utils/mincut/minCut.ts:59

___

### totalVertices

• `Private` **totalVertices**: *number*

Defined in: src/utils/mincut/minCut.ts:58

## Methods

### calcFlow

▸ `Private` **calcFlow**(`start`: *number*, `end`: *number*, `targetFlow`: *number*, `count`: *number*[]): *number*

Depth First Search-like: send flow at along path from from->to recursively while increasing the level of the
visited vertices by one

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | *number* | the vertex to start at |
| `end` | *number* | the vertex to try and reach |
| `targetFlow` | *number* | the amount of flow to try and achieve |
| `count` | *number*[] | keep track of which vertices have been visited so we don't include them twice |

**Returns:** *number*

Defined in: src/utils/mincut/minCut.ts:119

___

### calcMinCut

▸ **calcMinCut**(`source`: *number*, `sink`: *number*): *number*

Calculates min-cut graph using Dinic's Algorithm.
use getMinCut to get the actual verticies in the minCut

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | *number* | Source vertex |
| `sink` | *number* | Sink vertex |

**Returns:** *number*

Defined in: src/utils/mincut/minCut.ts:192

___

### createLevelGraph

▸ `Private` **createLevelGraph**(`from`: *number*, `to`: *number*): *boolean*

Uses Breadth First Search to see if a path exists to the vertex 'to' and generate the level graph

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | *number* | vertex to start from |
| `to` | *number* | vertex to try and reach |

**Returns:** *boolean*

Defined in: src/utils/mincut/minCut.ts:89

___

### getMinCut

▸ **getMinCut**(`from`: *number*): *number*[]

Uses Breadth First Search to find the vertices in the minCut for the graph
- Must call calcMinCut first to prepare the graph

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | *number* | the vertex to start from |

**Returns:** *number*[]

Defined in: src/utils/mincut/minCut.ts:151

___

### newEdge

▸ **newEdge**(`from`: *number*, `to`: *number*, `capacity`: *number*): *void*

Create a new edge in the graph as well as a corresponding reverse edge on the residual graph

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | *number* | vertex edge starts at |
| `to` | *number* | vertex edge leads to |
| `capacity` | *number* | max flow capacity for this edge |

**Returns:** *void*

Defined in: src/utils/mincut/minCut.ts:77
