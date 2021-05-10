[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/AcrossTick](../modules/utils_acrosstick.md) / AcrossTick

# Class: AcrossTick

[utils/AcrossTick](../modules/utils_acrosstick.md).AcrossTick

## Table of contents

### Constructors

- [constructor](utils_acrosstick.acrosstick.md#constructor)

### Properties

- [task](utils_acrosstick.acrosstick.md#task)

### Methods

- [finish](utils_acrosstick.acrosstick.md#finish)
- [mountTaskFunction](utils_acrosstick.acrosstick.md#mounttaskfunction)
- [runAfterTicks](utils_acrosstick.acrosstick.md#runafterticks)
- [runNow](utils_acrosstick.acrosstick.md#runnow)

## Constructors

### constructor

\+ **new AcrossTick**(): [*AcrossTick*](utils_acrosstick.acrosstick.md)

**Returns:** [*AcrossTick*](utils_acrosstick.acrosstick.md)

Defined in: src/utils/AcrossTick/index.ts:5

## Properties

### task

• **task**: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)

Defined in: src/utils/AcrossTick/index.ts:5

## Methods

### finish

▸ **finish**(): *void*

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:37

___

### mountTaskFunction

▸ **mountTaskFunction**(`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md), `taskFunction`: (`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)) => [*AcrossTickReturnCode*](../modules/utils_acrosstick_type.md#acrosstickreturncode)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md) |
| `taskFunction` | (`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)) => [*AcrossTickReturnCode*](../modules/utils_acrosstick_type.md#acrosstickreturncode) |

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:27

___

### runAfterTicks

▸ **runAfterTicks**(`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md) |

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:17

___

### runNow

▸ **runNow**(): *void*

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:23
