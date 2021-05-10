[manual-screeps](../README.md) / [Exports](../modules.md) / creep/routePlan

# Module: creep/routePlan

## Table of contents

### Classes

- [routePlan](../classes/creep_routeplan.routeplan.md)

### Interfaces

- [RouteConditionDetail](../interfaces/creep_routeplan.routeconditiondetail.md)
- [RouteMidpointDetail](../interfaces/creep_routeplan.routemidpointdetail.md)

### Type aliases

- [RouteSingleDetail](creep_routeplan.md#routesingledetail)

### Functions

- [callOnStart](creep_routeplan.md#callonstart)
- [isRouteMidpointDetail](creep_routeplan.md#isroutemidpointdetail)

## Type aliases

### RouteSingleDetail

Ƭ **RouteSingleDetail**: [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md) \| [*RouteConditionDetail*](../interfaces/creep_routeplan.routeconditiondetail.md)

Defined in: src/creep/routePlan/index.ts:263

## Functions

### callOnStart

▸ **callOnStart**(): *void*

**Returns:** *void*

Defined in: src/creep/routePlan/index.ts:4

___

### isRouteMidpointDetail

▸ **isRouteMidpointDetail**(`detail`: [*RouteSingleDetail*](creep_routeplan.md#routesingledetail)): detail is RouteMidpointDetail

#### Parameters

| Name | Type |
| :------ | :------ |
| `detail` | [*RouteSingleDetail*](creep_routeplan.md#routesingledetail) |

**Returns:** detail is RouteMidpointDetail

Defined in: src/creep/routePlan/index.ts:278
