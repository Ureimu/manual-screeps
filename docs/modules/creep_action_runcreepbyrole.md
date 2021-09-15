[manual-screeps](../README.md) / [Exports](../modules.md) / creep/action/runCreepByRole

# Module: creep/action/runCreepByRole

## Table of contents

### Interfaces

- [CreepRoleList](../interfaces/creep_action_runcreepbyrole.creeprolelist.md)

### Functions

- [registerCreepRole](creep_action_runcreepbyrole.md#registercreeprole)
- [runCreepByRole](creep_action_runcreepbyrole.md#runcreepbyrole)
- [setRoleForCreep](creep_action_runcreepbyrole.md#setroleforcreep)

## Functions

### registerCreepRole

▸ **registerCreepRole**(`creepRoleActionList`: [*CreepRoleList*](../interfaces/creep_action_runcreepbyrole.creeprolelist.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creepRoleActionList` | [*CreepRoleList*](../interfaces/creep_action_runcreepbyrole.creeprolelist.md) |

**Returns:** *void*

Defined in: src/frame/creep/action/runCreepByRole.ts:14

___

### runCreepByRole

▸ **runCreepByRole**(`creep`: Creep, `args`: *string*[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |
| `args` | *string*[] |

**Returns:** *void*

Defined in: src/frame/creep/action/runCreepByRole.ts:8

___

### setRoleForCreep

▸ **setRoleForCreep**(`args`: { `creepName`: *string* ; `roleName`: *string*  }): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepName` | *string* |
| `args.roleName` | *string* |

**Returns:** *void*

Defined in: src/frame/creep/action/runCreepByRole.ts:17
