[manual-screeps](../README.md) / [Exports](../modules.md) / utils/console/form

# Module: utils/console/form

## Table of contents

### Variables

- [creators](utils_console_form.md#creators)

### Functions

- [createForm](utils_console_form.md#createform)

## Variables

### creators

• `Const` **creators**: { [type in keyof HTMLElements]: function}

所有的 html 元素构造器

Defined in: src/utils/console/form/index.ts:24

## Functions

### createForm

▸ `Const` **createForm**(`uniqueName`: *string*, `details`: [*HTMLElementDetail*](utils_console_form_types.md#htmlelementdetail)[], `buttonDetail`: [*ButtonDetail*](../interfaces/utils_console_form_types.buttondetail.md)): *string*

创建表单

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uniqueName` | *string* | - |
| `details` | [*HTMLElementDetail*](utils_console_form_types.md#htmlelementdetail)[] | 表单元素列表 |
| `buttonDetail` | [*ButtonDetail*](../interfaces/utils_console_form_types.buttondetail.md) | 按钮的信息 |

**Returns:** *string*

Defined in: src/utils/console/form/index.ts:107
