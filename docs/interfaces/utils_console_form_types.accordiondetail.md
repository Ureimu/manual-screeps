[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/console/form/types](../modules/utils_console_form_types.md) / AccordionDetail

# Interface: AccordionDetail

[utils/console/form/types](../modules/utils_console_form_types.md).AccordionDetail

## Hierarchy

- *ElementDetail*

  ↳ **AccordionDetail**

## Table of contents

### Properties

- [label](utils_console_form_types.accordiondetail.md#label)
- [name](utils_console_form_types.accordiondetail.md#name)
- [option](utils_console_form_types.accordiondetail.md#option)
- [type](utils_console_form_types.accordiondetail.md#type)

## Properties

### label

• `Optional` **label**: *string*

该元素的前缀（用于 form 中）

Inherited from: ElementDetail.label

Defined in: src/utils/console/form/types.ts:12

___

### name

• **name**: *string*

该元素的 name 属性

Inherited from: ElementDetail.name

Defined in: src/utils/console/form/types.ts:8

___

### option

• **option**: *object*

待选项

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | *string* | 选项显示内容 |
| `value` | *object* | 选项值 |

Defined in: src/utils/console/form/types.ts:114

___

### type

• **type**: ``"accordion"``

Overrides: ElementDetail.type

Defined in: src/utils/console/form/types.ts:124
