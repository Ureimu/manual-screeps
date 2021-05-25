/**
 * 外矿相关参数
 *
 * @interface OutwardsSourceInput
 */
export interface OutwardsSourceInput {
    path: {
        /**
         * 自己房间内的路径长度，这一段不会计入维修花费
         *
         * @type {number}
         */
        ownedRoomPathLength: number;
        /**
         * 外矿路径长度，这一段会计入维修花费
         *
         * @type {number}
         */
        outwardsRoomPathLength: number;
        /**
         * 预定路径长度。（一般没有建路）
         *
         * @type {number}
         */
        reservePathLength: number;
    };
    /**
     * source容量。
     *
     * @type {number}
     * @memberof OutwardsSourceInput
     */
    capacity: number;
    /**
     * 是否使用reserve
     *
     * @type {boolean}
     * @memberof OutwardsSourceInput
     */
    reserve?: boolean;
    /**
     * 是否使用link
     *
     * @type {boolean}
     * @memberof OutwardsSourceInput
     */
    useLink?: boolean;
    /**
     * 加持的power效果
     *
     * @type {{
     *         [PWR_REGEN_SOURCE]?: powerLevels; // power效果等级
     *         [PWR_OPERATE_SPAWN]?: powerLevels;
     *     }}
     * @memberof OutwardsSourceInput
     */
    powers: {
        [PWR_REGEN_SOURCE]?: powerLevels; // power效果等级
        [PWR_OPERATE_SPAWN]?: powerLevels;
    };
}

export type powerLevels = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * 采集者相关参数
 *
 * @interface harvesterInput
 */
export interface HarvesterInput {
    /**
     * body字符串，请使用bodyTools提供的格式
     *
     * @type {string}
     * @memberof harvesterInput
     */
    body: string;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof harvesterInput
     */
    repairBoost?: number;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof harvesterInput
     */
    harvestBoost?: number;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof harvesterInput
     */
    moveBoost?: number;
}

/**
 * 搬运者相关参数
 *
 * @interface carrierInput
 */
export interface CarrierInput {
    /**
     * body字符串，请使用bodyTools提供的格式
     *
     * @type {string}
     * @memberof carrierInput
     */
    body: string;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof carrierInput
     */
    repairBoost?: number;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof carrierInput
     */
    moveBoost?: number;
    /**
     * boost效果值。
     *
     * @type {number}
     * @memberof carrierInput
     */
    carryBoost?: number;
}

export type ReserverInput =
    | {
          /**
           * 是否使用reserver
           *
           * @type {true}
           */
          used: true;
          /**
           * body字符串，请使用bodyTools提供的格式
           *
           * @type {string}
           */
          body: string;
          /**
           * boost效果值。
           *
           * @type {number}
           */
          moveBoost?: number;
      }
    | {
          used: false;
      };

export interface HarvesterData {
    /**
     * creep一生的能量消耗
     *
     * @type {{
     *         spawnCreeps?: number;
     *         repairContainer?: number;
     *     }}
     * @memberof harvester
     */
    energyCost: {
        /**
         * 孵化能量消耗
         *
         * @type {number}
         */
        spawnCreeps?: number;
        /**
         * 修container能量消耗
         *
         * @type {number}
         */
        repairContainer?: number;
    };
    body: {
        spawnTime: number;
        total: number;
        move: number;
        work: number;
        carry: number;
        energyCost: number;
    };
    harvestBoost: number;
    repairBoost: number;
    moveBoost: number;
    /**
     * 移动速度
     *
     * @type {number}
     * @memberof harvester
     */
    moveTimePerStep?: number;
    /**
     * 维修时消耗能量的速率
     *
     * @type {number}
     * @memberof harvester
     */
    repairEnergyCostSpeed?: number;
    /**
     * 工作时长，也是孵化间隔时长
     *
     * @type {number}
     * @memberof harvester
     */
    workTime?: number;
    /**
     * 采集能量速率
     *
     * @type {number}
     * @memberof harvester
     */
    harvestSpeed?: number;
    /**
     * 一轮能量生成(source regeneration)时的属性值
     *
     * @type {({
     *         countInLife?: number | string;
     *         repairContainerTime?: number;
     *         harvestTime?: number;
     *         harvestedEnergy?: number;
     *     })}
     * @memberof harvester
     */
    inRoundGeneration: {
        /**
         * 一生有几次能量生成
         *
         * @type {(number | string)}
         */
        countInLife?: number | string;
        /**
         * 花了多少时间修理container
         *
         * @type {number}
         */
        repairContainerTime?: number;
        /**
         * 花了多少时间采集
         *
         * @type {number}
         */
        harvestTime?: number;
        /**
         * 采集了多少能量
         *
         * @type {number}
         */
        harvestedEnergy?: number;
    };
}

export interface CarrierData {
    /**
     * 工作时长
     *
     * @type {number}
     * @memberof carrier
     */
    workTime?: number;
    /**
     * creep一生的能量消耗
     *
     * @type {({
     *         spawnCreeps?: number;
     *         repairRoad?: number | string;
     *     })}
     * @memberof carrier
     */
    energyCost: {
        /**
         * 孵化能量消耗
         *
         * @type {number}
         */
        spawnCreeps?: number;
        /**
         * 维修路能量消耗
         *
         * @type {(number | string)}
         */
        repairRoad?: number | string;
    };
    body: {
        spawnTime: number;
        total: number;
        move: number;
        work: number;
        carry: number;
        energyCost: number;
    };
    carryBoost: number;
    moveBoost: number;
    /**
     * 移动速率
     *
     * @type {number}
     * @memberof carrier
     */
    moveTimePerStep?: number;
    capacity?: number;
    /**
     * 为了运输所有能量，所需要的最多的carrier数量
     *
     * @type {number}
     * @memberof carrier
     */
    maxCarrierNum?: number;
    noLoad: {
        moveTimePerStep?: number;
    };
    fullLoad: {
        moveTimePerStep?: number;
    };
    transportCapability?: number;
    /**
     *  一轮搬运中的数据
     *
     * @type {({
     *         fillTime?: number | string;
     *         waitForRepairTime?: number | string;
     *         waitTime?: number;
     *         transitTime?: number;
     *         time?: number;
     *     })}
     * @memberof carrier
     */
    inRoundCarry: {
        /**
         * 装满所需时间
         *
         * @type {(number | string)}
         */
        fillTime?: number | string;
        /**
         * 平均等待container维修时间
         *
         * @type {(number | string)}
         */
        waitForRepairTime?: number | string;
        /**
         * 总等待时间
         *
         * @type {number}
         */
        waitTime?: number;
        /**
         * 运输路上花费的时间
         *
         * @type {number}
         */
        transitTime?: number;
        /**
         * 一轮搬运完成所需时间
         *
         * @type {number}
         */
        time?: number;
    };
    inRoundGeneration: {
        /**
         * 一生中有几个一轮
         *
         * @type {(number | string)}
         */
        countInLife?: number | string;
        /**
         * 在一轮能量生成中的运输量
         *
         * @type {number}
         */
        transportCapability?: number;
    };
}

export interface ReserverData {
    /**
     * 是否使用reserver
     *
     * @type {true}
     * @memberof reserver
     */
    used: true;
    /**
     * 工作时长
     *
     * @type {number}
     * @memberof reserver
     */
    workTime?: number;
    /**
     * 一生使controller增加的预定时间
     *
     * @type {number}
     * @memberof reserver
     */
    reservePoint?: number;
    /**
     * 移动速度
     *
     * @type {number}
     * @memberof reserver
     */

    moveTimePerStep: number;
    /**
     * 一生中的能量消耗
     *
     * @type {({
     *         spawnCreeps?: number;
     *         repairRoad?: number | string;
     *     })}
     * @memberof reserver
     */

    energyCost: {
        /**
         * 孵化能量消耗
         *
         * @type {number}
         */
        spawnCreeps?: number;
        /**
         * 维修路能量消耗
         *
         * @type {(number | string)}
         */
        repairRoad?: number | string;
    };
    body: {
        /**
         * 孵化花费的时间
         *
         * @type {number}
         */
        spawnTime: number;
        total: number;
        move: number;
        claim: number;
        /**
         * 一次孵化的能量消耗
         *
         * @type {number}
         */
        energyCost: number;
    };
    /**
     * 出生间隔
     *
     * @type {number}
     * @memberof reserver
     */
    spawnInterval?: number;
}

export interface ContainerData {
    /**
     * 每次老化时的属性值
     *
     * @type {{
     *         countInRoundGeneration: number;
     *         repairTimeCost?: number;
     *         repairEnergyCost: number;
     *     }}
     * @memberof container
     */
    perDecay: {
        countInRoundGeneration: number;
        /**
         * 修理container花费的时间
         *
         * @type {number}
         */
        repairTimeCost?: number;
        /**
         * 修理container花费的能量
         *
         * @type {number}
         */
        repairEnergyCost: number;
    };
    /**
     * 一轮能量生成(source regeneration)时的属性值
     *
     * @type {({
     *         gainedEnergy?: number;
     *         gainedEnergyPerTick?: number | string;
     *     })}
     * @memberof container
     */
    inRoundGeneration: {
        /**
         * 获得的能量
         *
         * @type {number}
         */
        gainedEnergy?: number;
        /**
         * 每tick获得的能量
         *
         * @type {(number | string)}
         */
        gainedEnergyPerTick?: number | string;
    };
}

export interface Stats {
    /**
     * 滞留的能量值
     *
     * @type {number}
     * @memberof Stats
     */
    energyStranded?: number;
    /**
     * 挖取的总能量值
     *
     * @type {number}
     * @memberof Stats
     */
    energyHarvested?: number;
    /**
     * 在孵化creep上花费的能量值
     *
     * @type {number}
     * @memberof Stats
     */
    energyOnSpawn?: number;
    /**
     * 在孵化creep上花费的时间
     *
     * @type {number}
     * @memberof Stats
     */
    timeOnSpawn?: number;
    /**
     * 在维修上花费的能量值
     *
     * @type {(number | string)}
     * @memberof Stats
     */
    energyOnRepair?: number | string;
    /**
     * 花费的总能量值
     *
     * @type {number}
     * @memberof Stats
     */
    energyCost?: number;
    /**
     * 扣除花费后的能量净利润值
     *
     * @type {number}
     * @memberof Stats
     */
    energyProfit?: number;
    /**
     * source的容量
     *
     * @type {number}
     * @memberof Stats
     */
    sourceCapacity: number;
    /**
     * 外矿效率
     *
     * @type {number}
     * @memberof Stats
     */
    efficiency?: number | string;
    cpuCost?: number; // TODO cpu统计
}

export interface CalculatorReturn {
    harvester: HarvesterData;
    container: ContainerData;
    reserver: Partial<ReserverData>;
    carrier: CarrierData;
    stats: Stats;
}
