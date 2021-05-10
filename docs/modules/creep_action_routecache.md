[manual-screeps](../README.md) / [Exports](../modules.md) / creep/action/routeCache

# Module: creep/action/routeCache

## Table of contents

### Interfaces

- [routeCacheDetail](../interfaces/creep_action_routecache.routecachedetail.md)

### Variables

- [emptyRouteCacheDetail](creep_action_routecache.md#emptyroutecachedetail)

### Functions

- [createRouteCache](creep_action_routecache.md#createroutecache)

## Variables

### emptyRouteCacheDetail

• `Const` **emptyRouteCacheDetail**: [*routeCacheDetail*](../interfaces/creep_action_routecache.routecachedetail.md)

Defined in: src/creep/action/routeCache/index.ts:24

## Functions

### createRouteCache

▸ **createRouteCache**(`startRouteDetail`: [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md), `endRouteDetail`: [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md), `creepPos`: RoomPosition): [*routeCacheDetail*](../interfaces/creep_action_routecache.routecachedetail.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `startRouteDetail` | [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md) |
| `endRouteDetail` | [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md) |
| `creepPos` | RoomPosition |

**Returns:** [*routeCacheDetail*](../interfaces/creep_action_routecache.routecachedetail.md)

Defined in: src/creep/action/routeCache/index.ts:31
