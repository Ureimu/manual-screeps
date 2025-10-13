export const roomControlDataSegmentNameList = Array(5)
    .fill(0)
    .map((i, index) => index + 10);

declare global {
    interface GlobalRoomMemory {
        control?: RoomControlData;
    }
}

export interface RoomControlData {
    getPower: {
        run: boolean;
    };
    harvestMineral: {
        run: boolean;
    };
    claimNewRoom: {
        run: boolean;
    };
    outwardsSource: {
        run: boolean;
    };
}

export const defaultRoomControlData: RoomControlData = {
    getPower: {
        run: true
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
