[manual-screeps](../README.md) / [Exports](../modules.md) / utils/console/utils

# Module: utils/console/utils

## Table of contents

### Functions

- [fixRetraction](utils_console_utils.md#fixretraction)
- [replaceHtml](utils_console_utils.md#replacehtml)

## Functions

### fixRetraction

▸ `Const` **fixRetraction**(`html`: *string*): *string*

修复 js 内容缩进引起的问题

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | *string* | 要进行修复的 html 字符串 |

**Returns:** *string*

修复完成的 html 字符串

Defined in: src/utils/console/utils.ts:25

___

### replaceHtml

▸ `Const` **replaceHtml**(`html`: *string*, `replaceContent?`: ReplaceContent): *string*

将内容插入到 html 模板

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `html` | *string* | - | 要进行替换的模板 html |
| `replaceContent` | ReplaceContent | {} | 要替换的内容 |

**Returns:** *string*

替换完成的 html 内容

Defined in: src/utils/console/utils.ts:12
