[manual-screeps](../README.md) / [Exports](../modules.md) / utils/stateCut/utils

# Module: utils/stateCut/utils

## Table of contents

### Functions

- [stateCut](utils_statecut_utils.md#statecut)

## Functions

### stateCut

▸ **stateCut**(`stateMemory`: (*number* \| *string*)[], `condition`: *Record*<number \| string, { `description`: *string* ; `name`: *string* ; `run`: (...`args`: *any*[]) => *string* \| *number*  }\>, `conditionArgs`: *any*[], `stateIndex`: *number*, `onStateChange`: (`name`: *string*, `state`: *string* \| *number*, `description`: *string*) => *void*): *number* \| *string*

一个多态状态机。

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateMemory` | (*number* \| *string*)[] |
| `condition` | *Record*<number \| string, { `description`: *string* ; `name`: *string* ; `run`: (...`args`: *any*[]) => *string* \| *number*  }\> |
| `conditionArgs` | *any*[] |
| `stateIndex` | *number* |
| `onStateChange` | (`name`: *string*, `state`: *string* \| *number*, `description`: *string*) => *void* |

**Returns:** *number* \| *string*

Defined in: src/utils/stateCut/utils.ts:11
