[manual-screeps](../README.md) / [Exports](../modules.md) / spawn/spawnPool/commit

# Module: spawn/spawnPool/commit

## Table of contents

### Variables

- [spawnPoolCommit](spawn_spawnpool_commit.md#spawnpoolcommit)

## Variables

### spawnPoolCommit

• `Const` **spawnPoolCommit**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addCreep` | (`args`: { `creepBody`: *string* ; `creepName`: *string* ; `priority`: *string* ; `readyCondition`: keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) ; `roomName`: *string*  }) => *string* |
| `deleteCreep` | (`args`: { `creepName`: *string* ; `roomName`: *string*  }) => *string* |
| `setCreepProperties` | (`args`: { `creepBody`: *string* ; `creepName`: *string* ; `priority`: *string* ; `readyCondition`: keyof [*ReadyCondition*](../interfaces/spawn_spawning_readycondition.readycondition.md) ; `roomName`: *string*  }) => *string* |

Defined in: src/spawn/spawnPool/commit.ts:7
