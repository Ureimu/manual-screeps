[manual-screeps](../README.md) / [Exports](../modules.md) / utils/console/colorful

# Module: utils/console/colorful

## Table of contents

### Type aliases

- [Colors](utils_console_colorful.md#colors)

### Variables

- [colors](utils_console_colorful.md#colors)

### Functions

- [default](utils_console_colorful.md#default)

## Type aliases

### Colors

Ƭ **Colors**: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"``

Defined in: src/utils/console/colorful.ts:25

## Variables

### colors

• `Const` **colors**: { [name in Colors]: string}

在绘制控制台信息时使用的颜色

Defined in: src/utils/console/colorful.ts:4

## Functions

### default

▸ **default**(`content`: *string*, `colorName?`: [*Colors*](utils_console_colorful.md#colors), `bolder?`: *boolean*): *string*

给指定文本添加颜色

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `content` | *string* | - | 要添加颜色的文本 |
| `colorName?` | [*Colors*](utils_console_colorful.md#colors) | - | 要添加的颜色常量字符串 |
| `bolder` | *boolean* | false | 是否加粗 |

**Returns:** *string*

Defined in: src/utils/console/colorful.ts:18
