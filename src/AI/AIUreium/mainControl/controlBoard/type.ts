export const roomControlDataSegmentNameList = Array(5)
    .fill(0)
    .map((i, index) => index + 10);

declare global {
    interface GlobalRoomMemory {
        control?: RoomControlData;
    }
}

export interface RoomControlData {
    /**
     * Power采集设定。
     */
    getPower: {
        /**
         * 是否进行Power采集。
         */
        run: boolean;
        rooms: string[];
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
    };
}

export const defaultRoomControlData: RoomControlData = {
    getPower: {
        run: false,
        rooms: []
    },
    harvestMineral: {
        run: true
    },
    claimNewRoom: {
        run: true
    },
    outwardsSource: {
        run: true
    }
};
