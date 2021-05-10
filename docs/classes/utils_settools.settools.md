[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/SetTools](../modules/utils_settools.md) / SetTools

# Class: SetTools

[utils/SetTools](../modules/utils_settools.md).SetTools

## Table of contents

### Constructors

- [constructor](utils_settools.settools.md#constructor)

### Methods

- [compareSet](utils_settools.settools.md#compareset)
- [copySet](utils_settools.settools.md#copyset)
- [intersect](utils_settools.settools.md#intersect)
- [mergeSet](utils_settools.settools.md#mergeset)
- [reverseSet](utils_settools.settools.md#reverseset)
- [subtract](utils_settools.settools.md#subtract)
- [union](utils_settools.settools.md#union)

## Constructors

### constructor

\+ **new SetTools**(): [*SetTools*](utils_settools.settools.md)

**Returns:** [*SetTools*](utils_settools.settools.md)

## Methods

### compareSet

▸ `Static` **compareSet**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>, `relation`: { `a*b`:  ; `a+b`:  ; `a-b`:  ; `b-a`:   }): *object*

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |
| `b` | *Set*<T\> |
| `relation` | *object* |
| `relation.a*b` | - |
| `relation.a+b` | - |
| `relation.a-b` | - |
| `relation.b-a` | - |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `a*b` |  |
| `a+b` |  |
| `a-b` |  |
| `b-a` |  |

Defined in: src/utils/SetTools/index.ts:24

___

### copySet

▸ `Static` **copySet**<T\>(`a`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:20

___

### intersect

▸ `Static` **intersect**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |
| `b` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:78

___

### mergeSet

▸ `Static` **mergeSet**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |
| `b` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:11

___

### reverseSet

▸ `Static` **reverseSet**<T\>(`set`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `set` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:2

___

### subtract

▸ `Static` **subtract**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |
| `b` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:60

___

### union

▸ `Static` **union**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |
| `b` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/utils/SetTools/index.ts:69
