[manual-screeps](../README.md) / [Exports](../modules.md) / utils/stateCut/condition

# Module: utils/stateCut/condition

## Table of contents

### Variables

- [default](utils_statecut_condition.md#default)

### Functions

- [customFunction](utils_statecut_condition.md#customfunction)

## Variables

### default

• `Const` **default**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isEmpty` | (`anyStorable`: { `store`: *Store*<ResourceConstant, ``false``\>  }) => () => *boolean* |
| `isFull` | (`anyStorable`: { `store`: *Store*<ResourceConstant, ``false``\>  }) => () => *boolean* |
| `isNotEmpty` | (`anyStorable`: { `store`: *Store*<ResourceConstant, ``false``\>  }) => () => *boolean* |
| `isNotFull` | (`anyStorable`: { `store`: *Store*<ResourceConstant, ``false``\>  }) => () => *boolean* |

Defined in: src/utils/stateCut/condition.ts:11

## Functions

### customFunction

▸ **customFunction**(`conditionFunction`: () => *boolean*, `returnPair?`: *number*[]): *function*

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionFunction` | () => *boolean* |
| `returnPair` | *number*[] |

**Returns:** () => *number*

Defined in: src/utils/stateCut/condition.ts:1
