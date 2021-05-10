[manual-screeps](../README.md) / [Exports](../modules.md) / [creep/body/tools](../modules/creep_body_tools.md) / bodyTools

# Class: bodyTools

[creep/body/tools](../modules/creep_body_tools.md).bodyTools

## Table of contents

### Constructors

- [constructor](creep_body_tools.bodytools.md#constructor)

### Properties

- [checkRegExp](creep_body_tools.bodytools.md#checkregexp)
- [mulRegExp](creep_body_tools.bodytools.md#mulregexp)
- [regExp](creep_body_tools.bodytools.md#regexp)

### Methods

- [check](creep_body_tools.bodytools.md#check)
- [compile](creep_body_tools.bodytools.md#compile)
- [flatten](creep_body_tools.bodytools.md#flatten)
- [getEnergyCost](creep_body_tools.bodytools.md#getenergycost)
- [getNum](creep_body_tools.bodytools.md#getnum)

## Constructors

### constructor

\+ **new bodyTools**(): [*bodyTools*](creep_body_tools.bodytools.md)

**Returns:** [*bodyTools*](creep_body_tools.bodytools.md)

## Properties

### checkRegExp

▪ `Static` `Private` **checkRegExp**: *RegExp*

Defined in: src/creep/body/tools.ts:29

___

### mulRegExp

▪ `Static` `Private` **mulRegExp**: *RegExp*

Defined in: src/creep/body/tools.ts:28

___

### regExp

▪ `Static` `Private` **regExp**: *RegExp*

Defined in: src/creep/body/tools.ts:27

## Methods

### check

▸ `Static` **check**(`body`: *string*): *boolean*

检查传入字符串是否符合格式

**`static`**

**`memberof`** bodyTools

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | *string* |

**Returns:** *boolean*

Defined in: src/creep/body/tools.ts:177

___

### compile

▸ `Static` **compile**(`body`: *string*): BodyPartConstant[]

身体部件生成器。示例：

* m5 = [ 'move', 'move', 'move', 'move', 'move' ]
* m2c2 = [ 'move', 'move', 'carry', 'carry' ]
* m1a1*4 =[
'move', 'attack',
'move', 'attack',
'move', 'attack',
'move', 'attack'
 ]
* m3r1h1t1*2 =[
'move', 'move',
'move', 'ranged_attack',
'heal', 'tough',
'move', 'move',
'move', 'ranged_attack',
'heal', 'tough'
 ]
*("\*"是"*")
* m1w2\*3m2w1\*2i3=[
'move',  'work',  'work',
'move',  'work',  'work',
'move',  'work',  'work',
'move',  'move',  'work',
'move',  'move',  'work',
'claim', 'claim', 'claim'
 ]

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | *string* |

**Returns:** BodyPartConstant[]

Defined in: src/creep/body/tools.ts:95

___

### flatten

▸ `Static` `Private` **flatten**(`body`: *string*): *string*

展平creepBody

**`static`**

**`memberof`** bodyTools

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | *string* |

**Returns:** *string*

Defined in: src/creep/body/tools.ts:39

___

### getEnergyCost

▸ `Static` **getEnergyCost**(`body`: *string*): *number*

获得body的能量消耗

**`static`**

**`memberof`** bodyTools

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | *string* |

**Returns:** *number*

Defined in: src/creep/body/tools.ts:155

___

### getNum

▸ `Static` **getNum**(`body`: *string*, `bodypartNameList?`: BodyPartConstant[]): *number*

获得body的组件数量

**`static`**

**`memberof`** bodyTools

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | *string* |
| `bodypartNameList?` | BodyPartConstant[] |

**Returns:** *number*

Defined in: src/creep/body/tools.ts:122
