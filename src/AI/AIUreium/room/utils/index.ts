export function initAiUreimuRoomMemory(): AIUreiumRoomMemory {
    return {
        maintainRoom: {},
        outwardsSource: {},
        newRoom: {},
        getPower: {},
        carryTaskPools: { carrier: {}, centerCarrier: {} },
        labTaskPool: {},
        labData: {}
    };
}
