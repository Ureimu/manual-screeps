[manual-screeps](../README.md) / [Exports](../modules.md) / creep/action/doOnJudgeCondition

# Module: creep/action/doOnJudgeCondition

## Table of contents

### Interfaces

- [CreepCondition](../interfaces/creep_action_doonjudgecondition.creepcondition.md)

### Variables

- [conditionIndexedList](creep_action_doonjudgecondition.md#conditionindexedlist)

### Functions

- [switchDoWhenCondition](creep_action_doonjudgecondition.md#switchdowhencondition)

## Variables

### conditionIndexedList

• `Const` **conditionIndexedList**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alwaysJump` | [*CreepCondition*](../interfaces/creep_action_doonjudgecondition.creepcondition.md) |
| `creepStore` | [*CreepCondition*](../interfaces/creep_action_doonjudgecondition.creepcondition.md) |
| `creepTimeToLive` | [*CreepCondition*](../interfaces/creep_action_doonjudgecondition.creepcondition.md) |
| `spawnEnergy` | [*CreepCondition*](../interfaces/creep_action_doonjudgecondition.creepcondition.md) |
| `store` | [*CreepCondition*](../interfaces/creep_action_doonjudgecondition.creepcondition.md) |

Defined in: src/frame/creep/action/doOnJudgeCondition/index.ts:23

## Functions

### switchDoWhenCondition

▸ **switchDoWhenCondition**(`routeDetail`: [*RouteConditionDetail*](../interfaces/creep_routeplan_type.routeconditiondetail.md), `creep`: Creep): [*state*](creep_action.md#state)

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeDetail` | [*RouteConditionDetail*](../interfaces/creep_routeplan_type.routeconditiondetail.md) |
| `creep` | Creep |

**Returns:** [*state*](creep_action.md#state)

Defined in: src/frame/creep/action/doOnJudgeCondition/index.ts:24
