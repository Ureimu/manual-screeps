[manual-screeps](../README.md) / [Exports](../modules.md) / [spawn/spawnPool](../modules/spawn_spawnpool.md) / SpawnPool

# Class: SpawnPool

[spawn/spawnPool](../modules/spawn_spawnpool.md).SpawnPool

## Table of contents

### Constructors

- [constructor](spawn_spawnpool.spawnpool.md#constructor)

### Methods

- [addCreep](spawn_spawnpool.spawnpool.md#addcreep)
- [deleteCreep](spawn_spawnpool.spawnpool.md#deletecreep)
- [setCreepProperties](spawn_spawnpool.spawnpool.md#setcreepproperties)

## Constructors

### constructor

\+ **new SpawnPool**(): [*SpawnPool*](spawn_spawnpool.spawnpool.md)

**Returns:** [*SpawnPool*](spawn_spawnpool.spawnpool.md)

## Methods

### addCreep

▸ `Static` **addCreep**(`args`: { `creepBody`: *string* ; `creepName`: *string* ; `priority`: *string* ; `readyCondition`: keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) ; `roomName`: *string*  }): *string*

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
| `args.readyCondition` | keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: src/frame/spawn/spawnPool/index.ts:22

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

Defined in: src/frame/spawn/spawnPool/index.ts:65

___

### setCreepProperties

▸ `Static` **setCreepProperties**(`args`: { `creepBody?`: *string* ; `creepName`: *string* ; `priority?`: *string* ; `readyCondition?`: keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) ; `roomName`: *string*  }): *string*

设置creep参数。

**`static`**

**`memberof`** spawnPool

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepBody?` | *string* |
| `args.creepName` | *string* |
| `args.priority?` | *string* |
| `args.readyCondition?` | keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) |
| `args.roomName` | *string* |

**Returns:** *string*

Defined in: src/frame/spawn/spawnPool/index.ts:85
