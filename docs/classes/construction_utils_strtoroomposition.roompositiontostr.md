[manual-screeps](../README.md) / [Exports](../modules.md) / [construction/utils/strToRoomPosition](../modules/construction_utils_strtoroomposition.md) / RoomPositionToStr

# Class: RoomPositionToStr

[construction/utils/strToRoomPosition](../modules/construction_utils_strtoroomposition.md).RoomPositionToStr

## Table of contents

### Constructors

- [constructor](construction_utils_strtoroomposition.roompositiontostr.md#constructor)

### Properties

- [rangeSettings](construction_utils_strtoroomposition.roompositiontostr.md#rangesettings)
- [regexp](construction_utils_strtoroomposition.roompositiontostr.md#regexp)
- [roomName](construction_utils_strtoroomposition.roompositiontostr.md#roomname)

### Methods

- [copySet](construction_utils_strtoroomposition.roompositiontostr.md#copyset)
- [genePosStr](construction_utils_strtoroomposition.roompositiontostr.md#geneposstr)
- [get2SnakePosStr](construction_utils_strtoroomposition.roompositiontostr.md#get2snakeposstr)
- [getDiagPosStr](construction_utils_strtoroomposition.roompositiontostr.md#getdiagposstr)
- [getPosFromStr](construction_utils_strtoroomposition.roompositiontostr.md#getposfromstr)
- [getPosStrInRange](construction_utils_strtoroomposition.roompositiontostr.md#getposstrinrange)
- [getQuadPosStr](construction_utils_strtoroomposition.roompositiontostr.md#getquadposstr)
- [getRangeToPosStr](construction_utils_strtoroomposition.roompositiontostr.md#getrangetoposstr)
- [getSquarePosStr](construction_utils_strtoroomposition.roompositiontostr.md#getsquareposstr)
- [ifInSquare](construction_utils_strtoroomposition.roompositiontostr.md#ifinsquare)
- [mergeSet](construction_utils_strtoroomposition.roompositiontostr.md#mergeset)
- [parseCoord](construction_utils_strtoroomposition.roompositiontostr.md#parsecoord)
- [regMatch](construction_utils_strtoroomposition.roompositiontostr.md#regmatch)
- [reverseSet](construction_utils_strtoroomposition.roompositiontostr.md#reverseset)
- [setPosToStr](construction_utils_strtoroomposition.roompositiontostr.md#setpostostr)

## Constructors

### constructor

\+ **new RoomPositionToStr**(`roomName?`: *string*, `rangeSettings?`: { `xMax`: *number* ; `xMin`: *number* ; `yMax`: *number* ; `yMin`: *number*  }): [*RoomPositionToStr*](construction_utils_strtoroomposition.roompositiontostr.md)

Creates an instance of RoomPositionToStr.

**`memberof`** RoomPositionToStr

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomName?` | *string* |
| `rangeSettings?` | *object* |
| `rangeSettings.xMax` | *number* |
| `rangeSettings.xMin` | *number* |
| `rangeSettings.yMax` | *number* |
| `rangeSettings.yMin` | *number* |

**Returns:** [*RoomPositionToStr*](construction_utils_strtoroomposition.roompositiontostr.md)

Defined in: src/construction/utils/strToRoomPosition.ts:16

## Properties

### rangeSettings

• `Readonly` **rangeSettings**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `xMax` | *number* |
| `xMin` | *number* |
| `yMax` | *number* |
| `yMin` | *number* |

Defined in: src/construction/utils/strToRoomPosition.ts:11

___

### regexp

• `Readonly` **regexp**: *RegExp*

Defined in: src/construction/utils/strToRoomPosition.ts:9

___

### roomName

• `Readonly` **roomName**: *undefined* \| *string*

Defined in: src/construction/utils/strToRoomPosition.ts:10

## Methods

### copySet

▸ **copySet**<T\>(`a`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/construction/utils/strToRoomPosition.ts:251

___

### genePosStr

▸ **genePosStr**(`x`: *number*, `y`: *number*, `roomName?`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `y` | *number* |
| `roomName?` | *string* |

**Returns:** *string*

Defined in: src/construction/utils/strToRoomPosition.ts:60

___

### get2SnakePosStr

▸ **get2SnakePosStr**(`inputStrSet`: *Set*<string\>): [*Set*<string\>, *Set*<string\>]

给定斜着的(也可以是横着或者竖着的，大概)构成简单连通图的位置集合，计算对应的🐍形布局。会为所有入度为1的端点设置1个出口，出口位置由该端点与另一点的连线方向决定。

**`memberof`** RoomPositionToStr

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputStrSet` | *Set*<string\> |

**Returns:** [*Set*<string\>, *Set*<string\>]

Defined in: src/construction/utils/strToRoomPosition.ts:155

___

### getDiagPosStr

▸ **getDiagPosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/construction/utils/strToRoomPosition.ts:132

___

### getPosFromStr

▸ **getPosFromStr**(`str`: *string*): RoomPosition

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** RoomPosition

Defined in: src/construction/utils/strToRoomPosition.ts:38

___

### getPosStrInRange

▸ **getPosStrInRange**(`str`: *string*, `range`: *number*): *Set*<string\>

返回给定范围内的位置字符串集合，注意该函数不会检查位置的合理性。

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `range` | *number* |

**Returns:** *Set*<string\>

Defined in: src/construction/utils/strToRoomPosition.ts:93

___

### getQuadPosStr

▸ **getQuadPosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/construction/utils/strToRoomPosition.ts:115

___

### getRangeToPosStr

▸ **getRangeToPosStr**(`str1`: *string*, `str2`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str1` | *string* |
| `str2` | *string* |

**Returns:** *number*

Defined in: src/construction/utils/strToRoomPosition.ts:220

___

### getSquarePosStr

▸ **getSquarePosStr**(`str`: *string*): *Set*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** *Set*<string\>

Defined in: src/construction/utils/strToRoomPosition.ts:109

___

### ifInSquare

▸ **ifInSquare**(`x`: *number*, `y`: *number*, `opts?`: { `xMax`: *number* ; `xMin`: *number* ; `yMax`: *number* ; `yMin`: *number*  }): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *number* |
| `y` | *number* |
| `opts` | *object* |
| `opts.xMax` | *number* |
| `opts.xMin` | *number* |
| `opts.yMax` | *number* |
| `opts.yMin` | *number* |

**Returns:** *boolean*

Defined in: src/construction/utils/strToRoomPosition.ts:72

___

### mergeSet

▸ **mergeSet**<T\>(`a`: *Set*<T\>, `b`: *Set*<T\>): *Set*<T\>

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

Defined in: src/construction/utils/strToRoomPosition.ts:242

___

### parseCoord

▸ **parseCoord**(`str`: *string*): Coord

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** Coord

Defined in: src/construction/utils/strToRoomPosition.ts:205

___

### regMatch

▸ **regMatch**(`str`: *string*): ``null`` \| *RegExpExecArray*

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |

**Returns:** ``null`` \| *RegExpExecArray*

Defined in: src/construction/utils/strToRoomPosition.ts:33

___

### reverseSet

▸ **reverseSet**<T\>(`set`: *Set*<T\>): *Set*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `set` | *Set*<T\> |

**Returns:** *Set*<T\>

Defined in: src/construction/utils/strToRoomPosition.ts:233

___

### setPosToStr

▸ **setPosToStr**(`pos`: RoomPosition): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | RoomPosition |

**Returns:** *string*

Defined in: src/construction/utils/strToRoomPosition.ts:52
