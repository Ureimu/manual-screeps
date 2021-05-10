[manual-screeps](../README.md) / [Modules](../modules.md) / [spawn/spawnPool](../modules/spawn_spawnpool.md) / spawnPool

# Class: spawnPool

[spawn/spawnPool](../modules/spawn_spawnpool.md).spawnPool

## Table of contents

### Constructors

- [constructor](spawn_spawnpool.spawnpool.md#constructor)

### Methods

- [addCreep](spawn_spawnpool.spawnpool.md#addcreep)
- [deleteCreep](spawn_spawnpool.spawnpool.md#deletecreep)
- [setCreepProperties](spawn_spawnpool.spawnpool.md#setcreepproperties)

## Constructors

### constructor

\+ **new spawnPool**(): [*spawnPool*](spawn_spawnpool.spawnpool.md)

**Returns:** [*spawnPool*](spawn_spawnpool.spawnpool.md)

## Methods

### addCreep

▸ `Static` **addCreep**(`args`: { `creepBody`: *string* ; `creepName`: *string* ; `priority`: *string* ; `readyCondition`: keyof ReadyCondition ; `roomName`: *string*  }): *string*

添加creep。

**`static`**

**`memberof`** spawnPool

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepBody` | *string* |
| `args.creepName` | *string* |
| `args.priority` | *string* |
| `args.readyCondition` | keyof ReadyCondition |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: spawn/spawnPool/index.ts:22

___

### deleteCreep

▸ `Static` **deleteCreep**(`args`: { `creepName`: *string* ; `roomName`: *string*  }): *string*

删除creep。

**`static`**

**`memberof`** spawnPool

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepName` | *string* |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: spawn/spawnPool/index.ts:64

___

### setCreepProperties

▸ `Static` **setCreepProperties**(`args`: { `creepBody`: *string* ; `creepName`: *string* ; `priority`: *string* ; `readyCondition`: keyof ReadyCondition ; `roomName`: *string*  }): *string*

设置creep参数。

**`static`**

**`memberof`** spawnPool

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepBody` | *string* |
| `args.creepName` | *string* |
| `args.priority` | *string* |
| `args.readyCondition` | keyof ReadyCondition |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: spawn/spawnPool/index.ts:84
