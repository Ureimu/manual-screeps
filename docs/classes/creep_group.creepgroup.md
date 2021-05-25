[manual-screeps](../README.md) / [Modules](../modules.md) / [creep/group](../modules/creep_group.md) / CreepGroup

# Class: CreepGroup

[creep/group](../modules/creep_group.md).CreepGroup

## Table of contents

### Constructors

- [constructor](creep_group.creepgroup.md#constructor)

### Methods

- [addCreep](creep_group.creepgroup.md#addcreep)
- [create](creep_group.creepgroup.md#create)
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

Defined in: creep/group/index.ts:48

___

### create

▸ `Static` **create**(`args`: { `creepGroupName`: *string* ; `routeName`: *string*  }): *string*

创建creep组。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.creepGroupName` | *string* | - |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/group/index.ts:17

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

Defined in: creep/group/index.ts:175

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

Defined in: creep/group/index.ts:81

___

### setCreepGroupProperties

▸ `Static` **setCreepGroupProperties**(`args`: { `creepGroupName`: *string* ; `routeName`: *string*  }): *string*

设定creep组参数。

**`static`**

**`memberof`** creepGroup

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* |  |
| `args.creepGroupName` | *string* | - |
| `args.routeName` | *string* | 路径名称 |

**Returns:** *string*

Defined in: creep/group/index.ts:119

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

Defined in: creep/group/index.ts:144
