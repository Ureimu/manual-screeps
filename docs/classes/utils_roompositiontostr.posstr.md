[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/RoomPositionToStr](../modules/utils_roompositiontostr.md) / PosStr

# Class: PosStr

[utils/RoomPositionToStr](../modules/utils_roompositiontostr.md).PosStr

## Table of contents

### Constructors

- [constructor](utils_roompositiontostr.posstr.md#constructor)

### Properties

- [rangeSettings](utils_roompositiontostr.posstr.md#rangesettings)
- [regexp](utils_roompositiontostr.posstr.md#regexp)

### Methods

- [copySet](utils_roompositiontostr.posstr.md#copyset)
- [genePosStr](utils_roompositiontostr.posstr.md#geneposstr)
- [get2SnakePosStr](utils_roompositiontostr.posstr.md#get2snakeposstr)
- [getDiagPosStr](utils_roompositiontostr.posstr.md#getdiagposstr)
- [getPosFromStr](utils_roompositiontostr.posstr.md#getposfromstr)
- [getPosStrInRange](utils_roompositiontostr.posstr.md#getposstrinrange)
- [getQuadPosStr](utils_roompositiontostr.posstr.md#getquadposstr)
- [getRangeToPosStr](utils_roompositiontostr.posstr.md#getrangetoposstr)
- [getSquarePosStr](utils_roompositiontostr.posstr.md#getsquareposstr)
- [ifInSquare](utils_roompositiontostr.posstr.md#ifinsquare)
- [mergeSet](utils_roompositiontostr.posstr.md#mergeset)
- [parseCoord](utils_roompositiontostr.posstr.md#parsecoord)
- [regMatch](utils_roompositiontostr.posstr.md#regmatch)
- [reverseSet](utils_roompositiontostr.posstr.md#reverseset)
- [setPosToStr](utils_roompositiontostr.posstr.md#setpostostr)

## Constructors

### constructor

\+ **new PosStr**(): [*PosStr*](utils_roompositiontostr.posstr.md)

**Returns:** [*PosStr*](utils_roompositiontostr.posstr.md)

## Properties

### rangeSettings

▪ `Static` `Readonly` **rangeSettings**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `xMax` | *number* |
| `xMin` | *number* |
| `yMax` | *number* |
| `yMin` | *number* |

Defined in: src/utils/RoomPositionToStr/index.ts:10

___

### regexp

▪ `Static` `Readonly` **regexp**: *RegExp*

Defined in: src/utils/RoomPositionToStr/index.ts:9

## Methods

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

Defined in: src/utils/RoomPositionToStr/index.ts:219

___

### genePosStr

▸ `Static` **genePosStr**(`x`: *number*, `y`: *number*, `roomName`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `y` | *number* |
| `roomName` | *string* |

**Returns:** *string*

Defined in: src/utils/RoomPositionToStr/index.ts:36

___

### get2SnakePosStr

▸ `Static` **get2SnakePosStr**(`inputStrSet`: *Set*<string\>): [*Set*<string\>, *Set*<string\>]

给定斜着的(也可以是横着或者竖着的，大概)构成简单连通图的位置集合，计算对应的🐍形布局。会为所有入度为1的端点设置1个出口，出口位置由该端点与另一点的连线方向决定。

**`memberof`** RoomPositionToStr

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputStrSet` | *Set*<string\> |

**Returns:** [*Set*<string\>, *Set*<string\>]

Defined in: src/utils/RoomPositionToStr/index.ts:123

___

### getDiagPosStr

▸ `Static` **getDiagPosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/utils/RoomPositionToStr/index.ts:100

___

### getPosFromStr

▸ `Static` **getPosFromStr**(`str`: *string*): RoomPosition

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** RoomPosition

Defined in: src/utils/RoomPositionToStr/index.ts:22

___

### getPosStrInRange

▸ `Static` **getPosStrInRange**(`str`: *string*, `range`: *number*): *Set*<string\>

返回给定范围内的位置字符串集合，注意该函数不会检查位置的合理性。

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `range` | *number* |

**Returns:** *Set*<string\>

Defined in: src/utils/RoomPositionToStr/index.ts:61

___

### getQuadPosStr

▸ `Static` **getQuadPosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/utils/RoomPositionToStr/index.ts:83

___

### getRangeToPosStr

▸ `Static` **getRangeToPosStr**(`str1`: *string*, `str2`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str1` | *string* |
| `str2` | *string* |

**Returns:** *number*

Defined in: src/utils/RoomPositionToStr/index.ts:188

___

### getSquarePosStr

▸ `Static` **getSquarePosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/utils/RoomPositionToStr/index.ts:77

___

### ifInSquare

▸ `Static` **ifInSquare**(`x`: *number*, `y`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `y` | *number* |

**Returns:** *boolean*

Defined in: src/utils/RoomPositionToStr/index.ts:44

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

Defined in: src/utils/RoomPositionToStr/index.ts:210

___

### parseCoord

▸ `Static` **parseCoord**(`str`: *string*): [*Coord*](../interfaces/utils_roompositiontostr.coord.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** [*Coord*](../interfaces/utils_roompositiontostr.coord.md)

Defined in: src/utils/RoomPositionToStr/index.ts:173

___

### regMatch

▸ `Static` **regMatch**(`str`: *string*): ``null`` \| *RegExpExecArray*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** ``null`` \| *RegExpExecArray*

Defined in: src/utils/RoomPositionToStr/index.ts:17

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

Defined in: src/utils/RoomPositionToStr/index.ts:201

___

### setPosToStr

▸ `Static` **setPosToStr**(`pos`: RoomPosition): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | RoomPosition |

**Returns:** *string*

Defined in: src/utils/RoomPositionToStr/index.ts:32
