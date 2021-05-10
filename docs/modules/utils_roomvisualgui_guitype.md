[manual-screeps](../README.md) / [Exports](../modules.md) / utils/roomVisualGUI/GUIType

# Module: utils/roomVisualGUI/GUIType

## Table of contents

### Interfaces

- [BoxConstructor](../interfaces/utils_roomvisualgui_guitype.boxconstructor.md)
- [Div](../interfaces/utils_roomvisualgui_guitype.div.md)
- [GUIclass](../interfaces/utils_roomvisualgui_guitype.guiclass.md)
- [Progress](../interfaces/utils_roomvisualgui_guitype.progress.md)
- [Text](../interfaces/utils_roomvisualgui_guitype.text.md)
- [baseLayout](../interfaces/utils_roomvisualgui_guitype.baselayout.md)
- [box](../interfaces/utils_roomvisualgui_guitype.box.md)
- [map](../interfaces/utils_roomvisualgui_guitype.map.md)
- [standardReturn](../interfaces/utils_roomvisualgui_guitype.standardreturn.md)

### Type aliases

- [LockTarget](utils_roomvisualgui_guitype.md#locktarget)
- [SwitchBar](utils_roomvisualgui_guitype.md#switchbar)
- [elementsConstant](utils_roomvisualgui_guitype.md#elementsconstant)
- [elementsLayout](utils_roomvisualgui_guitype.md#elementslayout)
- [elementsLayoutGeneral](utils_roomvisualgui_guitype.md#elementslayoutgeneral)
- [getType](utils_roomvisualgui_guitype.md#gettype)
- [setType](utils_roomvisualgui_guitype.md#settype)
- [standardReturnElementsLayout](utils_roomvisualgui_guitype.md#standardreturnelementslayout)

## Type aliases

### LockTarget

Ƭ **LockTarget**: [*baseLayout*](../interfaces/utils_roomvisualgui_guitype.baselayout.md)

Defined in: src/utils/roomVisualGUI/GUIType.ts:375

___

### SwitchBar

Ƭ **SwitchBar**: [*baseLayout*](../interfaces/utils_roomvisualgui_guitype.baselayout.md)

Defined in: src/utils/roomVisualGUI/GUIType.ts:373

___

### elementsConstant

Ƭ **elementsConstant**: ``"Div"`` \| ``"Text"`` \| ``"Progress"`` \| ``"SwitchBar"`` \| ``"LockTarget"``

Defined in: src/utils/roomVisualGUI/GUIType.ts:1

___

### elementsLayout

Ƭ **elementsLayout**: [*Div*](../interfaces/utils_roomvisualgui_guitype.div.md) \| [*Text*](../interfaces/utils_roomvisualgui_guitype.text.md) \| [*Progress*](../interfaces/utils_roomvisualgui_guitype.progress.md) \| [*SwitchBar*](utils_roomvisualgui_guitype.md#switchbar) \| [*LockTarget*](utils_roomvisualgui_guitype.md#locktarget)

Defined in: src/utils/roomVisualGUI/GUIType.ts:2

___

### elementsLayoutGeneral

Ƭ **elementsLayoutGeneral**: [*Div*](../interfaces/utils_roomvisualgui_guitype.div.md) & [*Text*](../interfaces/utils_roomvisualgui_guitype.text.md) & [*Progress*](../interfaces/utils_roomvisualgui_guitype.progress.md) & [*SwitchBar*](utils_roomvisualgui_guitype.md#switchbar) & [*LockTarget*](utils_roomvisualgui_guitype.md#locktarget)

Defined in: src/utils/roomVisualGUI/GUIType.ts:3

___

### getType

Ƭ **getType**<T\>: T *extends* ``"Div"`` ? [*Div*](../interfaces/utils_roomvisualgui_guitype.div.md) : T *extends* ``"Text"`` ? [*Text*](../interfaces/utils_roomvisualgui_guitype.text.md) : T *extends* ``"Progress"`` ? [*Progress*](../interfaces/utils_roomvisualgui_guitype.progress.md) : T *extends* ``"SwitchBar"`` ? [*SwitchBar*](utils_roomvisualgui_guitype.md#switchbar) : T *extends* ``"LockTarget"`` ? [*LockTarget*](utils_roomvisualgui_guitype.md#locktarget) : ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

Defined in: src/utils/roomVisualGUI/GUIType.ts:5

___

### setType

Ƭ **setType**<T\>: T *extends* [*Div*](../interfaces/utils_roomvisualgui_guitype.div.md) ? ``"Div"`` : T *extends* [*Text*](../interfaces/utils_roomvisualgui_guitype.text.md) ? ``"Text"`` : T *extends* [*Progress*](../interfaces/utils_roomvisualgui_guitype.progress.md) ? ``"Progress"`` : T *extends* [*SwitchBar*](utils_roomvisualgui_guitype.md#switchbar) ? ``"SwitchBar"`` : T *extends* [*LockTarget*](utils_roomvisualgui_guitype.md#locktarget) ? ``"LockTarget"`` : ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

Defined in: src/utils/roomVisualGUI/GUIType.ts:17

___

### standardReturnElementsLayout

Ƭ **standardReturnElementsLayout**: [*standardReturn*](../interfaces/utils_roomvisualgui_guitype.standardreturn.md)<[*Div*](../interfaces/utils_roomvisualgui_guitype.div.md)\> \| [*standardReturn*](../interfaces/utils_roomvisualgui_guitype.standardreturn.md)<[*Text*](../interfaces/utils_roomvisualgui_guitype.text.md)\> \| [*standardReturn*](../interfaces/utils_roomvisualgui_guitype.standardreturn.md)<[*Progress*](../interfaces/utils_roomvisualgui_guitype.progress.md)\>

Defined in: src/utils/roomVisualGUI/GUIType.ts:4
