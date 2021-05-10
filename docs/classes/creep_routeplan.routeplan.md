[manual-screeps](../README.md) / [Modules](../modules.md) / [creep/routePlan](../modules/creep_routeplan.md) / routePlan

# Class: routePlan

[creep/routePlan](../modules/creep_routeplan.md).routePlan

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

\+ **new routePlan**(): [*routePlan*](creep_routeplan.routeplan.md)

**Returns:** [*routePlan*](creep_routeplan.routeplan.md)

## Methods

### addCondition

▸ `Static` **addCondition**(`args`: { `routeName`: *string*  } & RouteConditionDetail): *string*

添加状态判断。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | { `routeName`: *string*  } & RouteConditionDetail |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:75

___

### addMidpoint

▸ `Static` **addMidpoint**(`args`: { `routeName`: *string*  } & RouteMidpointDetail): *string*

添加路径点。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | { `routeName`: *string*  } & RouteMidpointDetail |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:37

___

### chooseRouteForCreep

▸ `Static` **chooseRouteForCreep**(`args`: { `creepName`: *string* ; `routeName`: *string*  }): *string*

为creep选择路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepName` | *string* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:97

___

### create

▸ `Static` **create**(`args`: { `ifLoop`: *string* ; `routeName`: *string*  }): *string*

创建路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.ifLoop` | *string* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:19

___

### deleteRoute

▸ `Static` **deleteRoute**(`args`: { `routeName`: *string*  }): *string*

删除路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:163

___

### printRouteDetail

▸ `Static` **printRouteDetail**(`args`: { `routeName`: *string*  }): *string*

打印路径信息。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:177

___

### setRouteProperties

▸ `Static` **setRouteProperties**(`args`: { `ifLoop`: *string* ; `routeName`: *string*  }): *string*

设置路径参数。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.ifLoop` | *string* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:118

___

### showRoutes

▸ `Static` **showRoutes**(`args`: { `ifRun`: *string* ; `roomName`: *string* ; `routeName`: *string*  }): *string*

在房间中展示路径。

**`static`**

**`memberof`** routePlan

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.ifRun` | *string* |
| `args.roomName` | *string* |
| `args.routeName` | *string* |

**Returns:** *string*

Defined in: creep/routePlan/index.ts:132
