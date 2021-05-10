[manual-screeps](../README.md) / [Exports](../modules.md) / creep/routePlan/commit

# Module: creep/routePlan/commit

## Table of contents

### Variables

- [routePlanCommit](creep_routeplan_commit.md#routeplancommit)

## Variables

### routePlanCommit

• `Const` **routePlanCommit**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addCondition` | (`args`: { `routeName`: *string*  } & [*RouteConditionDetail*](../interfaces/creep_routeplan.routeconditiondetail.md)) => *string* |
| `addMidpoint` | (`args`: { `routeName`: *string*  } & [*RouteMidpointDetail*](../interfaces/creep_routeplan.routemidpointdetail.md)) => *string* |
| `chooseRouteForCreep` | (`args`: { `creepName`: *string* ; `routeName`: *string*  }) => *string* |
| `create` | (`args`: { `ifLoop`: *string* ; `routeName`: *string*  }) => *string* |
| `deleteRoute` | (`args`: { `routeName`: *string*  }) => *string* |
| `printRouteDetail` | (`args`: { `routeName`: *string*  }) => *string* |
| `setRouteProperties` | (`args`: { `ifLoop`: *string* ; `routeName`: *string*  }) => *string* |
| `showRoutes` | (`args`: { `ifRun`: *string* ; `roomName`: *string* ; `routeName`: *string*  }) => *string* |

Defined in: src/creep/routePlan/commit.ts:10
