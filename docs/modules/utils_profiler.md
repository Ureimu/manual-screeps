[manual-screeps](../README.md) / [Exports](../modules.md) / utils/profiler

# Module: utils/profiler

该模块的消耗大概在0.08cpu左右。

## Table of contents

### Functions

- [callgrind](utils_profiler.md#callgrind)
- [enable](utils_profiler.md#enable)
- [output](utils_profiler.md#output)
- [registerClass](utils_profiler.md#registerclass)
- [registerFN](utils_profiler.md#registerfn)
- [registerObject](utils_profiler.md#registerobject)
- [wrap](utils_profiler.md#wrap)

## Functions

### callgrind

▸ **callgrind**(): *string*

生成一段下载callgrind文件的html代码，在控制台使用可以下载callgrind文件。

**`export`** profiler

**Returns:** *string*

下载callgrind文件的html代码

Defined in: src/utils/profiler/index.d.ts:36

___

### enable

▸ **enable**(): *void*

启用profiler.

**`export`**

**Returns:** *void*

Defined in: src/utils/profiler/index.d.ts:21

___

### output

▸ **output**(`passedOutputLengthLimit`: *number*): *string*

输出调试信息。

**`export`** profiler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `passedOutputLengthLimit` | *number* | 返回信息的最大长度。 |

**Returns:** *string*

调试信息

Defined in: src/utils/profiler/index.d.ts:29

___

### registerClass

▸ **registerClass**<T\>(`object`: T, `label`: *string*): { [P in keyof T]: T[P] & object}

注册类到调试模块。

**`export`** profiler

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | *object* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | T |
| `label` | *string* |

**Returns:** { [P in keyof T]: T[P] & object}

{({
    [P in keyof T]: T[P] & { profilerWrapped: boolean; toString(): string };
})}

Defined in: src/utils/profiler/index.d.ts:78

___

### registerFN

▸ **registerFN**<T\>(`fn`: T, `functionName`: *string*): T & { `profilerWrapped`: *boolean* ; `toString`: () => *string*  }

注册函数到调试模块。

**`export`** profiler

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | (...`args`: *any*[]) => *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | T |
| `functionName` | *string* |

**Returns:** T & { `profilerWrapped`: *boolean* ; `toString`: () => *string*  }

)}

Defined in: src/utils/profiler/index.d.ts:63

___

### registerObject

▸ **registerObject**<T\>(`object`: T, `label`: *string*): { [P in keyof T]: T[P] & object}

注册object里的函数到调试模块。

**`export`** profiler

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | *object* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | T |
| `label` | *string* |

**Returns:** { [P in keyof T]: T[P] & object}

{({
    [P in keyof T]: T[P] & { profilerWrapped: boolean; toString(): string };
})}

Defined in: src/utils/profiler/index.d.ts:48

___

### wrap

▸ **wrap**(`callback`: *any*): *void*

包装主函数以方便后续操作。

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | *any* |

**Returns:** *void*

Defined in: src/utils/profiler/index.d.ts:15
