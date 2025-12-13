export function initAiUreimuRoomMemory(): AIUreiumRoomMemory {
    return {
        maintainRoom: { memory: {} },
        outwardsSource: {},
        newRoom: {},
        getPower: {},
        carryTaskPools: { carrier: {}, centerCarrier: {} },
        labTaskPool: {},
        labData: {}
    };
}
