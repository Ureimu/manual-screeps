[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/console/help/types](../modules/utils_console_help_types.md) / FunctionDescribe

# Interface: FunctionDescribe

[utils/console/help/types](../modules/utils_console_help_types.md).FunctionDescribe

描述一个函数

## Table of contents

### Properties

- [commandType](utils_console_help_types.functiondescribe.md#commandtype)
- [describe](utils_console_help_types.functiondescribe.md#describe)
- [functionName](utils_console_help_types.functiondescribe.md#functionname)
- [params](utils_console_help_types.functiondescribe.md#params)
- [title](utils_console_help_types.functiondescribe.md#title)

## Properties

### commandType

• `Optional` **commandType**: *boolean*

是否可以直接执行：不需要使用 () 就可以执行的命令

Defined in: src/utils/console/help/types.ts:52

___

### describe

• `Optional` **describe**: *string*

函数如何使用

Defined in: src/utils/console/help/types.ts:30

___

### functionName

• **functionName**: *string*

函数的方法名

Defined in: src/utils/console/help/types.ts:48

___

### params

• `Optional` **params**: { `desc`: *string* ; `name`: *string*  }[]

参数列表
置空则没有参数

Defined in: src/utils/console/help/types.ts:35

___

### title

• **title**: *string*

函数的名字

Defined in: src/utils/console/help/types.ts:26
