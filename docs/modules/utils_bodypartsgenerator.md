[manual-screeps](../README.md) / [Exports](../modules.md) / utils/bodypartsGenerator

# Module: utils/bodypartsGenerator

## Table of contents

### Type aliases

- [bpgGene](utils_bodypartsgenerator.md#bpggene)

### Properties

- [default](utils_bodypartsgenerator.md#default)

## Type aliases

### bpgGene

Ƭ **bpgGene**: { [bodypartsName in BodyPartConstant \| "repeat"]?: number}

生成身体部件列表的简化输入类型，属性名代表部件名，属性值代表生成部件数量。repeat属性指定重复次数。

Defined in: src/utils/bodypartsGenerator.ts:6

## Properties

### default

• **default**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bpg` | (`bodyparts`: [*bpgGene*](utils_bodypartsgenerator.md#bpggene)[]) => BodyPartConstant[] |
| `getBpEnergy` | (`bodyparts`: [*bpgGene*](utils_bodypartsgenerator.md#bpggene)[]) => *number* |
| `getBpNum` | (`bodyparts`: [*bpgGene*](utils_bodypartsgenerator.md#bpggene)[], `bodypartName?`: BodyPartConstant) => *number* |
