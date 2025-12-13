[manual-screeps](../README.md) / [Exports](../modules.md) / RoomConfig

# Interface: RoomConfig

## Table of contents

### Properties

- [claimNewRoom](RoomConfig.md#claimnewroom)
- [controllerLink](RoomConfig.md#controllerlink)
- [getPower](RoomConfig.md#getpower)
- [harvestMineral](RoomConfig.md#harvestmineral)
- [market](RoomConfig.md#market)
- [outwardsSource](RoomConfig.md#outwardssource)
- [processPower](RoomConfig.md#processpower)
- [roomResources](RoomConfig.md#roomresources)
- [upgradeController](RoomConfig.md#upgradecontroller)

## Properties

### claimNewRoom

• **claimNewRoom**: `Object`

占新房间设定。

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `run` | `boolean` | 设为true，则会有可能以该房间为起点占领其他房间。 |

#### Defined in

[type.ts:86](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L86)

___

### controllerLink

• **controllerLink**: `Object`

controllerLink的设置

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | 开始工作的比率，实际开始工作的storage能量值等于开始工作的比率乘以storage的最大能量值。 |
| `stop` | `number` | 停止工作的比率，实际停止工作的storage能量值等于停止工作的比率乘以storage的最小能量值。 |

#### Defined in

[type.ts:213](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L213)

___

### getPower

• **getPower**: `Object`

Power采集设定。

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `lowestEnergyInStorage` | `number` | 启用power采集的最低能量限制。 |
| `minPowerInBank` | `number` | 选定powerBank开挖的，powerBank最低power值 |
| `rooms` | `string`[] | 允许采集power的房间列表。 |
| `run` | `boolean` | 是否进行Power采集。 |
| `useBoost` | `boolean` | 是否允许使用boost。 为true时，实际运行时会自动检查是否能够使用。 若无法使用boost会自动使用非boost配置。  实际使用还需配置roomResource提供相应boost资源。 |

#### Defined in

[type.ts:44](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L44)

___

### harvestMineral

• **harvestMineral**: `Object`

家里的mineral采集设定。

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `run` | `boolean` | 是否进行mineral采集。 |

#### Defined in

[type.ts:77](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L77)

___

### market

• **market**: `Object`

market设定。

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `buyEnergy` | `boolean` | 是否购买能量。 |
| `buyLimitRate` | `number` | 物资数量的买入限制比率。  当storage的物资数量小于storage的物资数量最小值乘以该比率时，就会自动尝试买入该物资。 |
| `dealRate` | `number` | 交易处理速率。 |
| `energyCostPrice` | `number` | 能量消耗时，消耗的能量的估算单价。  在deal单子时，会以该价格估算能量成本，以选择更好的单子。 |
| `sellEnergy` | `boolean` | 是否卖出能量。 |
| `sellLimitRate` | `number` | 物资数量的卖出限制比率。  当storage的物资数量大于storage的物资数量最大值乘以该比率时，就会自动尝试卖出该物资。 |

#### Defined in

[type.ts:161](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L161)

___

### outwardsSource

• **outwardsSource**: `Object`

外矿采集设定。

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `invaderCoreStrategy` | ``"stop"`` \| ``"attack"`` | 处理invaderCore的策略。  stop则暂停该房间外矿creep的孵化。  attack则会产生attacker攻击invaderCore（未实现）。 |
| `invaderStrategy` | ``"stop"`` \| ``"attack"`` | 处理invader的策略。  stop则暂停该房间外矿creep的孵化。  attack则会产生attacker攻击invader（未实现）。 |
| `maxDistance` | `number` | 最大允许的外矿距离。  should not be bigger than 25/0.3, or change body data (also 0.3) in src\AI\AIUreium\room\outwardsSource\tasks\createCreepGroup\createOCarryGroup.ts |
| `rooms` | `string`[] | 允许采集外矿的房间列表。 |
| `run` | `boolean` | 是否进行外矿采集。 |
| `sourceAmount` | `number` | 允许的最大source数量。 |
| `startEnergyRate` | `number` | 开始外矿作业的能量比率。  当storage的能量小于storage的能量最小值乘以该比率时，会开始执行外矿作业。  该设置用于防止能量爆仓。 |
| `stopEnergyRate` | `number` | 停止外矿作业的能量比率。  当storage的能量大于storage的能量最大值乘以该比率时，会停止执行外矿作业。   该设置用于防止能量爆仓。 |
| `useReserver` | `boolean` | 是否使用reserver。 |
| `useRoad` | `boolean` | 是否使用外矿road，包含修建和维护。 |

#### Defined in

[type.ts:95](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L95)

___

### processPower

• **processPower**: `Object`

power处理设置

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `energyLimit` | `number` | 执行power处理的最低storage所含能量数量限制。 |
| `powerLimit` | `number` | 执行power处理的最低storage所含power数量限制。 |
| `run` | `boolean` | 是否执行power处理。 |

#### Defined in

[type.ts:226](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L226)

___

### roomResources

• **roomResources**: [`RoomResourcesConfig`](../modules.md#roomresourcesconfig)

房间资源量上下限设置。

#### Defined in

[type.ts:243](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L243)

___

### upgradeController

• **upgradeController**: `Object`

升级控制器设置

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `run` | ``"stop"`` \| ``"loop"`` \| ``"onControllerLinkWorks"`` | loop为一直执行， stop为停止执行， onControllerLinkWorks为仅当controllerLink工作时才执行。 |

#### Defined in

[type.ts:202](https://github.com/Ureimu/manual-screeps/blob/c6b9418/src/AI/AIUreium/config/type.ts#L202)
