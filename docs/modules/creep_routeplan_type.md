[manual-screeps](../README.md) / [Modules](../modules.md) / creep/routePlan/type

# Module: creep/routePlan/type

## Table of contents

### Interfaces

- [RouteConditionDetail](../interfaces/creep_routeplan_type.routeconditiondetail.md)
- [RouteMidpointDetail](../interfaces/creep_routeplan_type.routemidpointdetail.md)

### Type aliases

- [RouteSingleDetail](creep_routeplan_type.md#routesingledetail)

### Functions

- [isRouteMidpointDetail](creep_routeplan_type.md#isroutemidpointdetail)

## Type aliases

### RouteSingleDetail

Ƭ **RouteSingleDetail**: [*RouteMidpointDetail*](../interfaces/creep_routeplan_type.routemidpointdetail.md) \| [*RouteConditionDetail*](../interfaces/creep_routeplan_type.routeconditiondetail.md)

Defined in: creep/routePlan/type.ts:15

## Functions

### isRouteMidpointDetail

▸ **isRouteMidpointDetail**(`detail`: [*RouteSingleDetail*](creep_routeplan_type.md#routesingledetail)): detail is RouteMidpointDetail

判断RouteSingleDetail的具体类型。

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `detail` | [*RouteSingleDetail*](creep_routeplan_type.md#routesingledetail) |

**Returns:** detail is RouteMidpointDetail

Defined in: creep/routePlan/type.ts:67
