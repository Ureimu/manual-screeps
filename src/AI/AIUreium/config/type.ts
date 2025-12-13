import { RecursivePartial } from "utils/typeUtils";
import { RoomResourceLimit } from "../control/constants/type";
import { RoomStatusOutwardsSource } from "../control/outwardsSource/type";

// 对roomSetting有个重要的假定，即设定信息不会在运行时修改。
declare global {
    interface GlobalRoomMemory {
        control?: RoomConfig;
        status?: RoomStatus;
    }
}

declare global {
    namespace NodeJS {
        interface Global {
            mainControlData: MainConfig;
        }
    }
}

export type ScreepsConfigType = {
    rooms: {
        [roomName: string]: RoomConfig;
    };
    main: MainConfig;
};

export type PartialConfigType = {
    rooms: {
        [roomName: string]: RecursivePartial<RoomConfig>;
    };
    main?: RecursivePartial<MainConfig>;
};

export interface MainConfig {
    /**
     * 是否启用profiler。
     *
     */
    useProfiler: boolean;
}

export interface RoomConfig {
    /**
     * Power采集设定。
     */
    getPower: {
        /**
         * 是否进行Power采集。
         */
        run: boolean;
        /**
         * 允许采集power的房间列表。
         */
        rooms: string[];

        /**
         * 启用power采集的最低能量限制。
         */
        lowestEnergyInStorage: number;

        /**
         * 选定powerBank开挖的，powerBank最低power值
         *
         */
        minPowerInBank: number;

        /**
         * 是否允许使用boost。
         * 为true时，实际运行时会自动检查是否能够使用。
         * 若无法使用boost会自动使用非boost配置。
         *
         * 实际使用还需配置roomResource提供相应boost资源。
         */
        useBoost: boolean;
    };
    /**
     * 家里的mineral采集设定。
     */
    harvestMineral: {
        /**
         * 是否进行mineral采集。
         */
        run: boolean;
    };
    /**
     * 占新房间设定。
     */
    claimNewRoom: {
        /**
         * 设为true，则会有可能以该房间为起点占领其他房间。
         */
        run: boolean;
    };
    /**
     * 外矿采集设定。
     */
    outwardsSource: {
        /**
         * 是否进行外矿采集。
         */
        run: boolean;

        /**
         * 最大允许的外矿距离。
         *
         * should not be bigger than 25/0.3, or change body data (also 0.3) in src\AI\AIUreium\room\outwardsSource\tasks\createCreepGroup\createOCarryGroup.ts
         */
        maxDistance: number;
        /**
         * 允许采集外矿的房间列表。
         */
        rooms: string[];
        /**
         * 处理invaderCore的策略。
         *
         * stop则暂停该房间外矿creep的孵化。
         *
         * attack则会产生attacker攻击invaderCore（未实现）。
         */
        invaderCoreStrategy: "stop" | "attack";
        /**
         * 处理invader的策略。
         *
         * stop则暂停该房间外矿creep的孵化。
         *
         * attack则会产生attacker攻击invader（未实现）。
         */
        invaderStrategy: "stop" | "attack";
        /**
         * 是否使用外矿road，包含修建和维护。
         */
        useRoad: boolean;
        /**
         * 是否使用reserver。
         */
        useReserver: boolean;
    };
    /**
     * market设定。
     */
    market: {
        /**
         * 是否购买能量。
         */

        buyEnergy: boolean;

        /**
         * 是否卖出能量。
         */
        sellEnergy: boolean;
    };
    /**
     * 升级控制器设置
     */
    upgradeController: {
        /**
         * loop为一直执行，
         * stop为停止执行，
         * onControllerLinkWorks为仅当controllerLink工作时才执行。
         */
        run: "loop" | "stop" | "onControllerLinkWorks";
    };
    /**
     * controllerLink的设置
     */
    controllerLink: {
        /**
         * 开始工作的比率，实际开始工作的storage能量值等于开始工作的比率乘以storage的最大能量值。
         */
        start: number;
        /**
         * 停止工作的比率，实际停止工作的storage能量值等于停止工作的比率乘以storage的最小能量值。
         */
        stop: number;
    };
    /**
     * power处理设置
     */
    processPower: {
        /**
         * 是否执行power处理。
         */
        run: boolean;
        /**
         * 执行power处理的最低storage所含能量数量限制。
         */
        energyLimit: number;
        /**
         * 执行power处理的最低storage所含power数量限制。
         */
        powerLimit: number;
    };
    /**
     * 房间资源量上下限设置。
     */
    roomResources: RoomResourcesConfig;
}

export type RoomResourcesConfig = {
    /**
     * 设定为true，则terminal设置不会生效，
     * 会使用storage的数据设定乘以一定比例转换为terminal数据设定。
     *
     */
    terminalBoundToStorageLimit: boolean;
    /**
     *  房间资源量上下限设置。
     */
    limit: RoomResourceLimit;
};

export interface RoomStatus {
    outwardsSource?: RoomStatusOutwardsSource;
}
