[manual-screeps](../README.md) / [Exports](../modules.md) / creep/group/type

# Module: creep/group/type

## Table of contents

### Interfaces

- [creepGroupDetail](../interfaces/creep_group_type.creepgroupdetail.md)

### Type aliases

- [CreepGroupMemory](creep_group_type.md#creepgroupmemory)
- [CreepGroupMode](creep_group_type.md#creepgroupmode)

### Functions

- [creepGroupModeIsRoute](creep_group_type.md#creepgroupmodeisroute)

## Type aliases

### CreepGroupMemory

Ƭ **CreepGroupMemory**<T\>: T *extends* ``"route"`` ? { `creepNameList`: *string*[] ; `ifShow`: *boolean* ; `mode`: ``"route"`` ; `routeName?`: *string*  } : T *extends* ``"role"`` ? { `creepNameList`: *string*[] ; `ifShow`: *boolean* ; `mode`: ``"role"`` ; `roleName?`: *string*  } : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*CreepGroupMode*](creep_group_type.md#creepgroupmode) |

Defined in: src/frame/creep/group/type.ts:22

___

### CreepGroupMode

Ƭ **CreepGroupMode**: ``"route"`` \| ``"role"``

Defined in: src/frame/creep/group/type.ts:38

## Functions

### creepGroupModeIsRoute

▸ **creepGroupModeIsRoute**(`memory`: [*CreepGroupMemory*](creep_group_type.md#creepgroupmemory)<[*CreepGroupMode*](creep_group_type.md#creepgroupmode)\>): memory is object

#### Parameters

| Name | Type |
| :------ | :------ |
| `memory` | [*CreepGroupMemory*](creep_group_type.md#creepgroupmemory)<[*CreepGroupMode*](creep_group_type.md#creepgroupmode)\> |

**Returns:** memory is object

Defined in: src/frame/creep/group/type.ts:40
