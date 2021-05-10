[manual-screeps](../README.md) / [Exports](../modules.md) / [utils/roomVisualGUI/GUIType](../modules/utils_roomvisualgui_guitype.md) / Text

# Interface: Text

[utils/roomVisualGUI/GUIType](../modules/utils_roomvisualgui_guitype.md).Text

文本组件，显示文本

**`interface`** Text

## Hierarchy

- [*baseLayout*](utils_roomvisualgui_guitype.baselayout.md)

  ↳ **Text**

## Table of contents

### Properties

- [align](utils_roomvisualgui_guitype.text.md#align)
- [background](utils_roomvisualgui_guitype.text.md#background)
- [backgroundPadding](utils_roomvisualgui_guitype.text.md#backgroundpadding)
- [color](utils_roomvisualgui_guitype.text.md#color)
- [content](utils_roomvisualgui_guitype.text.md#content)
- [font](utils_roomvisualgui_guitype.text.md#font)
- [stroke](utils_roomvisualgui_guitype.text.md#stroke)
- [visibility](utils_roomvisualgui_guitype.text.md#visibility)
- [x](utils_roomvisualgui_guitype.text.md#x)
- [y](utils_roomvisualgui_guitype.text.md#y)

## Properties

### align

• `Optional` **align**: ``"left"`` \| ``"center"`` \| ``"right"``

文本对齐模式，center，left 或者 right 之一。默认值为left。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:282

___

### background

• `Optional` **background**: *string*

背景颜色，允许使用任何 web 格式颜色，默认未定义（没有背景）。
当启用背景时，文本的竖直对齐模式将设置为 middle（默认为 baseline）。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:262

___

### backgroundPadding

• `Optional` **backgroundPadding**: *number*

背景矩形的填充值，现在没有启用。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:306

___

### color

• `Optional` **color**: *string*

字体颜色。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:314

___

### content

• **content**: *string*

要显示的文本字符串。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:298

___

### font

• `Optional` **font**: *string* \| *number*

数字或者字符串，应使用下列形式：
* 0.7 - 基于游戏坐标的相对大小
* 20px - 基于像素的绝对大小
* 0.7 serif
* bold italic 1.5 Times New Roman

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:274

___

### stroke

• `Optional` **stroke**: *string*

轮廓颜色，允许使用任何 web 格式颜色，默认未定义（没有轮廓）。

**`memberof`** Text

Defined in: src/utils/roomVisualGUI/GUIType.ts:290

___

### visibility

• `Optional` **visibility**: *boolean*

组件是否可见。

**`memberof`** baseLayout

Inherited from: [baseLayout](utils_roomvisualgui_guitype.baselayout.md).[visibility](utils_roomvisualgui_guitype.baselayout.md#visibility)

Defined in: src/utils/roomVisualGUI/GUIType.ts:36

___

### x

• **x**: *number*

组件的横轴坐标。

**`memberof`** baseLayout

Inherited from: [baseLayout](utils_roomvisualgui_guitype.baselayout.md).[x](utils_roomvisualgui_guitype.baselayout.md#x)

Defined in: src/utils/roomVisualGUI/GUIType.ts:44

___

### y

• **y**: *number*

组件的纵轴坐标。

**`memberof`** baseLayout

Inherited from: [baseLayout](utils_roomvisualgui_guitype.baselayout.md).[y](utils_roomvisualgui_guitype.baselayout.md#y)

Defined in: src/utils/roomVisualGUI/GUIType.ts:52
