[manual-screeps](../README.md) / [Exports](../modules.md) / [creep/body](../modules/creep_body.md) / CreepBody

# Class: CreepBody

[creep/body](../modules/creep_body.md).CreepBody

## Table of contents

### Constructors

- [constructor](creep_body.creepbody.md#constructor)

### Methods

- [createConfig](creep_body.creepbody.md#createconfig)
- [deleteConfig](creep_body.creepbody.md#deleteconfig)
- [setConfig](creep_body.creepbody.md#setconfig)

## Constructors

### constructor

\+ **new CreepBody**(): [*CreepBody*](creep_body.creepbody.md)

**Returns:** [*CreepBody*](creep_body.creepbody.md)

## Methods

### createConfig

▸ `Static` **createConfig**(`args`: { `creepBodyConfigName`: *string*  }): *string*

创建creep身体部件配置项。

**`static`**

**`memberof`** creepBody

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | *object* | 名称 |
| `args.creepBodyConfigName` | *string* | - |

**Returns:** *string*

一段文字说明

Defined in: src/frame/creep/body/index.ts:16

___

### deleteConfig

▸ `Static` **deleteConfig**(`args`: { `creepBodyConfigName`: *string*  }): *string*

删除creep身体部件配置项。

**`static`**

**`memberof`** creepBody

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.creepBodyConfigName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/body/index.ts:60

___

### setConfig

▸ `Static` **setConfig**(`args`: { `controllerLevel`: [*ControllerLevels*](../modules/creep_body_type.md#controllerlevels) ; `creepBodyConfig`: *string* ; `creepBodyConfigName`: *string*  }): *string*

设置creep身体部件配置项。

**`static`**

**`memberof`** creepBody

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | *object* |
| `args.controllerLevel` | [*ControllerLevels*](../modules/creep_body_type.md#controllerlevels) |
| `args.creepBodyConfig` | *string* |
| `args.creepBodyConfigName` | *string* |

**Returns:** *string*

Defined in: src/frame/creep/body/index.ts:36
