[manual-screeps](../README.md) / [Exports](../modules.md) / [creep/group](../modules/creep_group.md) / CreepGroup

# Class: CreepGroup

[creep/group](../modules/creep_group.md).CreepGroup

## Table of contents

### Constructors

- [constructor](creep_group.creepgroup.md#constructor)

### Methods

- [addCreep](creep_group.creepgroup.md#addcreep)
- [create](creep_group.creepgroup.md#create)
- [deleteCreep](creep_group.creepgroup.md#deletecreep)
- [deleteCreepGroup](creep_group.creepgroup.md#deletecreepgroup)
- [moveCreep](creep_group.creepgroup.md#movecreep)
- [setCreepGroupProperties](creep_group.creepgroup.md#setcreepgroupproperties)
- [showCreepGroups](creep_group.creepgroup.md#showcreepgroups)

## Constructors

### constructor

\+ **new CreepGroup**(): [*CreepGroup*](creep_group.creepgroup.md)

**Returns:** [*CreepGroup*](creep_group.creepgroup.md)

## Methods

### addCreep

▸ `Static` **addCreep**(`args`: { `creepGroupName`: *string* ; `creepName`: *string*  }): *string*

为creep组添加creep

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepGroupName` | *string* |
| `args.creepName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:44

___

### create

▸ `Static` **create**(`args`: { `creepGroupName`: *string* ; `groupArguments`: *string* ; `mode`: [*CreepGroupMode*](../modules/creep_group_type.md#creepgroupmode)  }): *string*

创建creep组。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepGroupName` | *string* |
| `args.groupArguments` | *string* |
| `args.mode` | [*CreepGroupMode*](../modules/creep_group_type.md#creepgroupmode) |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:19

___

### deleteCreep

▸ `Static` **deleteCreep**(`args`: { `creepGroupName`: *string* ; `creepName`: *string*  }): *string*

从creep组删除creep。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepGroupName` | *string* |
| `args.creepName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:253

___

### deleteCreepGroup

▸ `Static` **deleteCreepGroup**(`args`: { `creepGroupName`: *string*  }): *string*

删除creep组。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepGroupName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:238

___

### moveCreep

▸ `Static` **moveCreep**(`args`: { `creepName`: *string* ; `currentCreepGroupName`: *string* ; `newCreepGroupName`: *string*  }): *string*

将一个creep从原creep组移动到一个新creep组

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepName` | *string* |
| `args.currentCreepGroupName` | *string* |
| `args.newCreepGroupName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:86

___

### setCreepGroupProperties

▸ `Static` **setCreepGroupProperties**(`args`: { `creepGroupName`: *string* ; `mode?`: [*CreepGroupMode*](../modules/creep_group_type.md#creepgroupmode) ; `roleName?`: *string* ; `routeName?`: *string*  }): *string*

设定creep组参数。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.creepGroupName` | *string* | - |
| `args.mode?` | [*CreepGroupMode*](../modules/creep_group_type.md#creepgroupmode) | - |
| `args.roleName?` | *string* | - |
| `args.routeName?` | *string* | 路径名称 |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:133

___

### showCreepGroups

▸ `Static` **showCreepGroups**(`args`: { `creepGroupName`: *string* ; `ifRun`: *string* ; `roomName`: *string*  }): *string*

在房间中显示creep组。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepGroupName` | *string* |
| `args.ifRun` | *string* |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/group/index.ts:194
