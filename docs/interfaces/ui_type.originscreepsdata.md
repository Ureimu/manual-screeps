[manual-screeps](../README.md) / [Exports](../modules.md) / [ui/type](../modules/ui_type.md) / OriginScreepsData

# Interface: OriginScreepsData

[ui/type](../modules/ui_type.md).OriginScreepsData

## Table of contents

### Properties

- [globalData](ui_type.originscreepsdata.md#globaldata)
- [roomData](ui_type.originscreepsdata.md#roomdata)
- [shardData](ui_type.originscreepsdata.md#sharddata)
- [timeData](ui_type.originscreepsdata.md#timedata)
- [timeSeriesData](ui_type.originscreepsdata.md#timeseriesdata)
- [userData](ui_type.originscreepsdata.md#userdata)

## Properties

### globalData

• **globalData**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `creepBodyConfig` | *object* |
| `creepGroups` | *object* |

Defined in: src/frame/ui/type.ts:19

___

### roomData

• **roomData**: *object*

#### Type declaration

Defined in: src/frame/ui/type.ts:16

___

### shardData

• **shardData**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `shardName` | *string* |

Defined in: src/frame/ui/type.ts:13

___

### timeData

• **timeData**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `tick` | *number* |
| `time` | *number* |

Defined in: src/frame/ui/type.ts:3

___

### timeSeriesData

• **timeSeriesData**: [*FrameStats*](ui_type.framestats.md)<number[]\> & { `gameTime`: [*SingleData*](ui_type.singledata.md)<number[]\> ; `timeStamp`: [*SingleData*](ui_type.singledata.md)<number[]\>  }

Defined in: src/frame/ui/type.ts:2

___

### userData

• **userData**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | [*ErrorSegmentMemory*](ui_type.errorsegmentmemory.md) |
| `gcl` | [*LevelData*](ui_type.leveldata.md) |
| `gpl` | [*LevelData*](ui_type.leveldata.md) |
| `name` | *string* |

Defined in: src/frame/ui/type.ts:7
