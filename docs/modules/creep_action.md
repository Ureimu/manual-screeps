[manual-screeps](../README.md) / [Exports](../modules.md) / creep/action

# Module: creep/action

## Table of contents

### Interfaces

- [CreepMemoryRouteDetail](../interfaces/creep_action.creepmemoryroutedetail.md)

### Type aliases

- [state](creep_action.md#state)

### Functions

- [callOnCreepBirth](creep_action.md#calloncreepbirth)
- [callOnStart](creep_action.md#callonstart)
- [clearCreepRouteMemory](creep_action.md#clearcreeproutememory)
- [runCreepAction](creep_action.md#runcreepaction)
- [runRecursiveCreepAction](creep_action.md#runrecursivecreepaction)

## Type aliases

### state

Ƭ **state**: ``"moving"`` \| ``"arrived"`` \| ``"end"`` \| ``"getState"``

Defined in: src/creep/action/index.ts:41

## Functions

### callOnCreepBirth

▸ **callOnCreepBirth**(`creep`: Creep): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |

**Returns:** *void*

Defined in: src/creep/action/index.ts:17

___

### callOnStart

▸ **callOnStart**(): *void*

**Returns:** *void*

Defined in: src/creep/action/index.ts:22

___

### clearCreepRouteMemory

▸ **clearCreepRouteMemory**(`creepMemory`: CreepMemory): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creepMemory` | CreepMemory |

**Returns:** *void*

Defined in: src/creep/action/index.ts:9

___

### runCreepAction

▸ **runCreepAction**(`creep`: Creep): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |

**Returns:** *void*

Defined in: src/creep/action/index.ts:43

___

### runRecursiveCreepAction

▸ **runRecursiveCreepAction**(`creep`: Creep, `creepRoute`: [*CreepMemoryRouteDetail*](../interfaces/creep_action.creepmemoryroutedetail.md), `switchCounter`: { `count`: *number*  }): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |
| `creepRoute` | [*CreepMemoryRouteDetail*](../interfaces/creep_action.creepmemoryroutedetail.md) |
| `switchCounter` | *object* |
| `switchCounter.count` | *number* |

**Returns:** *void*

Defined in: src/creep/action/index.ts:51
