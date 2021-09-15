[manual-screeps](../README.md) / [Exports](../modules.md) / ui/type

# Module: ui/type

## Table of contents

### Interfaces

- [ErrorCache](../interfaces/ui_type.errorcache.md)
- [ErrorSegmentMemory](../interfaces/ui_type.errorsegmentmemory.md)
- [FrameStats](../interfaces/ui_type.framestats.md)
- [LevelData](../interfaces/ui_type.leveldata.md)
- [OriginScreepsData](../interfaces/ui_type.originscreepsdata.md)
- [RoomData](../interfaces/ui_type.roomdata.md)
- [SingleData](../interfaces/ui_type.singledata.md)
- [SingleErrorCache](../interfaces/ui_type.singleerrorcache.md)
- [SpawnPoolData](../interfaces/ui_type.spawnpooldata.md)
- [StoreData](../interfaces/ui_type.storedata.md)

### Type aliases

- [ControllerLevels](ui_type.md#controllerlevels)
- [CreepGroupMemory](ui_type.md#creepgroupmemory)
- [CreepGroupMode](ui_type.md#creepgroupmode)
- [SingleTypedTreeData](ui_type.md#singletypedtreedata)
- [SingleTypedTreeDataNode](ui_type.md#singletypedtreedatanode)
- [creepBodyConfigDetail](ui_type.md#creepbodyconfigdetail)

## Type aliases

### ControllerLevels

Ƭ **ControllerLevels**: ``"0"`` \| ``"1"`` \| ``"2"`` \| ``"3"`` \| ``"4"`` \| ``"5"`` \| ``"6"`` \| ``"7"`` \| ``"8"``

Defined in: src/frame/ui/type.ts:73

___

### CreepGroupMemory

Ƭ **CreepGroupMemory**<T\>: T *extends* ``"route"`` ? { `creepNameList`: *string*[] ; `ifShow`: *boolean* ; `mode`: ``"route"`` ; `routeName?`: *string*  } : T *extends* ``"role"`` ? { `creepNameList`: *string*[] ; `ifShow`: *boolean* ; `mode`: ``"role"`` ; `roleName?`: *string*  } : *never*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*CreepGroupMode*](ui_type.md#creepgroupmode) |

Defined in: src/frame/ui/type.ts:29

___

### CreepGroupMode

Ƭ **CreepGroupMode**: ``"route"`` \| ``"role"``

Defined in: src/frame/ui/type.ts:45

___

### SingleTypedTreeData

Ƭ **SingleTypedTreeData**<T\>: *Record*<string, [*SingleTypedTreeDataNode*](ui_type.md#singletypedtreedatanode)<T\>\> & { `gameTime?`: T ; `timeStamp?`: T  }

#### Type parameters

| Name |
| :------ |
| `T` |

Defined in: src/frame/ui/type.ts:117

___

### SingleTypedTreeDataNode

Ƭ **SingleTypedTreeDataNode**<T\>: T \| *SingleTypedTreeDataRecord*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

Defined in: src/frame/ui/type.ts:111

___

### creepBodyConfigDetail

Ƭ **creepBodyConfigDetail**: *Partial*<{ [p in ControllerLevels]: object}\>

Defined in: src/frame/ui/type.ts:75
