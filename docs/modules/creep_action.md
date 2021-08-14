[manual-screeps](../README.md) / [Exports](../modules.md) / creep/action

# Module: creep/action

## Table of contents

### Interfaces

- [CreepMemoryRouteDetail](../interfaces/creep_action.creepmemoryroutedetail.md)

### Type aliases

- [conditionState](creep_action.md#conditionstate)
- [state](creep_action.md#state)

### Properties

- [default](creep_action.md#default)

### Functions

- [callOnCreepBirth](creep_action.md#calloncreepbirth)
- [callOnStart](creep_action.md#callonstart)
- [clearCreepRouteMemory](creep_action.md#clearcreeproutememory)

## Type aliases

### conditionState

Ƭ **conditionState**: ``"jump"`` \| ``"notJump"``

Defined in: src/frame/creep/action/index.ts:49

___

### state

Ƭ **state**: ``"moving"`` \| ``"arrived"`` \| ``"end"`` \| ``"getState"``

Defined in: src/frame/creep/action/index.ts:48

## Properties

### default

• **default**: (`creep`: Creep) => *void* & { `profilerWrapped`: *boolean* ; `toString`: () => *string*  }

## Functions

### callOnCreepBirth

▸ **callOnCreepBirth**(`creep`: Creep): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creep` | Creep |

**Returns:** *void*

Defined in: src/frame/creep/action/index.ts:19

___

### callOnStart

▸ **callOnStart**(): *void*

**Returns:** *void*

Defined in: src/frame/creep/action/index.ts:27

___

### clearCreepRouteMemory

▸ **clearCreepRouteMemory**(`creepMemory`: CreepMemory): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `creepMemory` | CreepMemory |

**Returns:** *void*

Defined in: src/frame/creep/action/index.ts:11
