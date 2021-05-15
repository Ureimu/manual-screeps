[manual-screeps](../README.md) / [Modules](../modules.md) / [creep/routePlan/type](../modules/creep_routeplan_type.md) / RouteMidpointDetail

# Interface: RouteMidpointDetail

[creep/routePlan/type](../modules/creep_routeplan_type.md).RouteMidpointDetail

路径点的详细信息

**`export`**

**`interface`** RouteMidpointDetail

## Table of contents

### Properties

- [actionArgs](creep_routeplan_type.routemidpointdetail.md#actionargs)
- [doWhenArrive](creep_routeplan_type.routemidpointdetail.md#dowhenarrive)
- [pathMidpointPos](creep_routeplan_type.routemidpointdetail.md#pathmidpointpos)
- [range](creep_routeplan_type.routemidpointdetail.md#range)

## Properties

### actionArgs

• `Optional` **actionArgs**: *string*

动作参数。

**`memberof`** RouteMidpointDetail

Defined in: creep/routePlan/type.ts:51

___

### doWhenArrive

• **doWhenArrive**: ``"goTo"`` \| ``"harvestSource"`` \| ``"upgradeController"`` \| ``"signController"`` \| ``"transferEnergy"`` \| ``"withdrawEnergy"`` \| ``"build"`` \| ``"keepOnHarvestingSource"`` \| ``"buildInRange"`` \| ``"fillSpawnAndExtension"`` \| ``"fillTower"``

当到达位置时执行的动作。

**`memberof`** RouteMidpointDetail

Defined in: creep/routePlan/type.ts:44

___

### pathMidpointPos

• **pathMidpointPos**: *string*

路径点位置字符串。

**`memberof`** RouteMidpointDetail

Defined in: creep/routePlan/type.ts:30

___

### range

• **range**: *number*

范围大小，为大于0的整数

**`memberof`** RouteMidpointDetail

Defined in: creep/routePlan/type.ts:37
