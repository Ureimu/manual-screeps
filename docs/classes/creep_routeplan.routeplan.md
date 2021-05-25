[manual-screeps](../README.md) / [Modules](../modules.md) / [creep/routePlan](../modules/creep_routeplan.md) / RoutePlan

# Class: RoutePlan

[creep/routePlan](../modules/creep_routeplan.md).RoutePlan

## Table of contents

### Constructors

- [constructor](creep_routeplan.routeplan.md#constructor)

### Methods

- [addCondition](creep_routeplan.routeplan.md#addcondition)
- [addMidpoint](creep_routeplan.routeplan.md#addmidpoint)
- [chooseRouteForCreep](creep_routeplan.routeplan.md#chooserouteforcreep)
- [create](creep_routeplan.routeplan.md#create)
- [deleteRoute](creep_routeplan.routeplan.md#deleteroute)
- [printRouteDetail](creep_routeplan.routeplan.md#printroutedetail)
- [setRouteProperties](creep_routeplan.routeplan.md#setrouteproperties)
- [showRoutes](creep_routeplan.routeplan.md#showroutes)

## Constructors

### constructor

\+ **new RoutePlan**(): [*RoutePlan*](creep_routeplan.routeplan.md)

**Returns:** [*RoutePlan*](creep_routeplan.routeplan.md)

## Methods

### addCondition

▸ `Static` **addCondition**(`args`: { `routeName`: *string*  } & [*RouteConditionDetail*](../interfaces/creep_routeplan_type.routeconditiondetail.md)): *string*

添加状态判断。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | { `routeName`: *string*  } & [*RouteConditionDetail*](../interfaces/creep_routeplan_type.routeconditiondetail.md) |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:93

___

### addMidpoint

▸ `Static` **addMidpoint**(`args`: { `routeName`: *string*  } & [*RouteMidpointDetail*](../interfaces/creep_routeplan_type.routemidpointdetail.md)): *string*

添加路径点。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | { `routeName`: *string*  } & [*RouteMidpointDetail*](../interfaces/creep_routeplan_type.routemidpointdetail.md) |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:50

___

### chooseRouteForCreep

▸ `Static` **chooseRouteForCreep**(`args`: { `creepName`: *string* ; `routeName`: *string*  }): *string*

为creep选择路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.creepName` | *string* | creep名称 |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:120

___

### create

▸ `Static` **create**(`args`: { `ifLoop`: ``"true"`` \| ``"false"`` ; `routeName`: *string*  }): *string*

创建路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.ifLoop` | ``"true"`` \| ``"false"`` | 是否循环执行 |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:19

___

### deleteRoute

▸ `Static` **deleteRoute**(`args`: { `routeName`: *string*  }): *string*

删除路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:231

___

### printRouteDetail

▸ `Static` **printRouteDetail**(`args`: { `routeName`: *string*  }): *string*

打印路径信息。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:252

___

### setRouteProperties

▸ `Static` **setRouteProperties**(`args`: { `ifLoop`: *string* ; `routeName`: *string*  }): *string*

设置路径参数。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.ifLoop` | *string* | 循环条件 |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:154

___

### showRoutes

▸ `Static` **showRoutes**(`args`: { `ifRun`: *string* ; `roomName`: *string* ; `routeName`: *string*  }): *string*

在房间中展示路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.ifRun` | *string* | 是否执行 |
| `args.roomName` | *string* | 执行可视化的房间名称 |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:181
