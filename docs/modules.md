[manual-screeps](README.md) / Exports

# manual-screeps

## Table of contents

### Interfaces

- [MainConfig](interfaces/MainConfig.md)
- [RoomConfig](interfaces/RoomConfig.md)

### Type aliases

- [PartialScreepsConfig](modules.md#partialscreepsconfig)
- [RoomResourcesConfig](modules.md#roomresourcesconfig)
- [ScreepsConfig](modules.md#screepsconfig)

## Type aliases

### PartialScreepsConfig

Ƭ **PartialScreepsConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `main?` | `RecursivePartial`<[`MainConfig`](interfaces/MainConfig.md)\> |
| `rooms` | `Object` |
| `rooms.default` | `RecursivePartial`<[`RoomConfig`](interfaces/RoomConfig.md)\> |

#### Defined in

[type.ts:19](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L19)

___

### RoomResourcesConfig

Ƭ **RoomResourcesConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `RoomResourceLimit` | 房间资源量上下限设置。 |
| `terminalBoundToStorageLimit` | `boolean` | 设定为true，则terminal设置不会生效， 会使用storage的数据设定乘以一定比例转换为terminal数据设定。 |

#### Defined in

[type.ts:246](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L246)

___

### ScreepsConfig

Ƭ **ScreepsConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `main` | [`MainConfig`](interfaces/MainConfig.md) |
| `rooms` | `Object` |
| `rooms.default` | [`RoomConfig`](interfaces/RoomConfig.md) |

#### Defined in

[type.ts:6](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L6)
