[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/roomVisualGUI/GUIType](../modules/utils_roomvisualgui_guitype.md) / GUIclass

# Interface: GUIclass

[utils/roomVisualGUI/GUIType](../modules/utils_roomvisualgui_guitype.md).GUIclass

## Indexable

▪ [name: *string*]: [*standardReturnElementsLayout*](../modules/utils_roomvisualgui_guitype.md#standardreturnelementslayout) \| (`visual`: RoomVisual, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<[*elementsConstant*](../modules/utils_roomvisualgui_guitype.md#elementsconstant)\>[], `x`: *number*, `y`: *number*) => *void* \| (`visual`: RoomVisual, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<[*elementsConstant*](../modules/utils_roomvisualgui_guitype.md#elementsconstant)\>[]) => *void*

## Table of contents

### Properties

- [Div](utils_roomvisualgui_guitype.guiclass.md#div)
- [LockTarget](utils_roomvisualgui_guitype.guiclass.md#locktarget)
- [Progress](utils_roomvisualgui_guitype.guiclass.md#progress)
- [SwitchBar](utils_roomvisualgui_guitype.guiclass.md#switchbar)
- [Text](utils_roomvisualgui_guitype.guiclass.md#text)
- [draw](utils_roomvisualgui_guitype.guiclass.md#draw)
- [drawMap](utils_roomvisualgui_guitype.guiclass.md#drawmap)

## Properties

### Div

• **Div**: [*standardReturn*](utils_roomvisualgui_guitype.standardreturn.md)<[*Div*](utils_roomvisualgui_guitype.div.md)\>

容器组件，用于内置其他组件。

**`memberof`** GUIclass

Defined in: src/utils/roomVisualGUI/GUIType.ts:131

___

### LockTarget

• **LockTarget**: [*standardReturn*](utils_roomvisualgui_guitype.standardreturn.md)<[*baseLayout*](utils_roomvisualgui_guitype.baselayout.md)\>

**`memberof`** GUIclass

Defined in: src/utils/roomVisualGUI/GUIType.ts:175

___

### Progress

• **Progress**: [*standardReturn*](utils_roomvisualgui_guitype.standardreturn.md)<[*Progress*](utils_roomvisualgui_guitype.progress.md)\>

进度条，显示进度
可用属性：
width：进度条宽度
height:进度条高度
value:进度值0~100
background:进度条背景颜色
progressColor:进度条颜色
borderColor:进度条边框颜色
visibility:是否可见

**`memberof`** GUIclass

Defined in: src/utils/roomVisualGUI/GUIType.ts:155

___

### SwitchBar

• **SwitchBar**: [*standardReturn*](utils_roomvisualgui_guitype.standardreturn.md)<[*baseLayout*](utils_roomvisualgui_guitype.baselayout.md)\>

开关条组件，展示项目是否开启
可用属性：
state:开关状态(true/false)
height:开关高度
width:开关宽度

**`memberof`** GUIclass

Defined in: src/utils/roomVisualGUI/GUIType.ts:167

___

### Text

• **Text**: [*standardReturn*](utils_roomvisualgui_guitype.standardreturn.md)<[*Text*](utils_roomvisualgui_guitype.text.md)\>

文本组件，显示文本。

**`memberof`** GUIclass

Defined in: src/utils/roomVisualGUI/GUIType.ts:139

___

### draw

• **draw**: <T\>(`visual`: *RoomVisual*, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<T\>[]) => *RoomVisual*

基本GUI渲染函数，供用户调用。

**`memberof`** GUIclass

#### Type declaration

▸ <T\>(`visual`: *RoomVisual*, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<T\>[]): *RoomVisual*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*elementsConstant*](../modules/utils_roomvisualgui_guitype.md#elementsconstant) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `visual` | *RoomVisual* |
| `map` | [*map*](utils_roomvisualgui_guitype.map.md)<T\>[] |

**Returns:** *RoomVisual*

Defined in: src/utils/roomVisualGUI/GUIType.ts:107

Defined in: src/utils/roomVisualGUI/GUIType.ts:107

___

### drawMap

• **drawMap**: <T\>(`visual`: *RoomVisual*, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<T\>[], `x`: *number*, `y`: *number*) => *RoomVisual*

迭代循环布局结构。

**`memberof`** GUIclass

#### Type declaration

▸ <T\>(`visual`: *RoomVisual*, `map`: [*map*](utils_roomvisualgui_guitype.map.md)<T\>[], `x`: *number*, `y`: *number*): *RoomVisual*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*elementsConstant*](../modules/utils_roomvisualgui_guitype.md#elementsconstant) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `visual` | *RoomVisual* |
| `map` | [*map*](utils_roomvisualgui_guitype.map.md)<T\>[] |
| `x` | *number* |
| `y` | *number* |

**Returns:** *RoomVisual*

Defined in: src/utils/roomVisualGUI/GUIType.ts:114

Defined in: src/utils/roomVisualGUI/GUIType.ts:114
