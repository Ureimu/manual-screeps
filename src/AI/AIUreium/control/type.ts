export const roomControlDataSegmentNameList = Array(5)
    .fill(0)
    .map((i, index) => index + 10);

declare global {
    interface GlobalRoomMemory {
        control?: RoomControlData;
    }
}
// TODO 添加invaderCore处理。
export interface RoomControlData {
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
        InvaderCoreStrategy: "stop" | "attack";
    };
    /**
     * market设定。
     */
    market: {
        /**
         * 是否购买能量。
         */

        buyEnergy: boolean;
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
}
