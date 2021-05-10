[manual-screeps](../README.md) / [Exports](../modules.md) / utils/AcrossTick

# Module: utils/AcrossTick

## Table of contents

### Classes

- [AcrossTick](../classes/utils_acrosstick.acrosstick.md)

### Functions

- [newAcrossTickTask](utils_acrosstick.md#newacrossticktask)
- [runAfterTask](utils_acrosstick.md#runaftertask)
- [runAllAcrossTickTask](utils_acrosstick.md#runallacrossticktask)

## Functions

### newAcrossTickTask

▸ **newAcrossTickTask**(`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md), `taskFunction?`: (`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)) => [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md) |
| `taskFunction?` | (`task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)) => [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode) |

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:43

___

### runAfterTask

▸ **runAfterTask**(`returnCode`: [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode), `task`: [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md)): [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode)

#### Parameters

| Name | Type |
| :------ | :------ |
| `returnCode` | [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode) |
| `task` | [*AcrossTickMemory*](../interfaces/utils_acrosstick_type.acrosstickmemory.md) |

**Returns:** [*AcrossTickReturnCode*](utils_acrosstick_type.md#acrosstickreturncode)

Defined in: src/utils/AcrossTick/index.ts:91

___

### runAllAcrossTickTask

▸ **runAllAcrossTickTask**(): *void*

**Returns:** *void*

Defined in: src/utils/AcrossTick/index.ts:55
