/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * 环境声明文件，请不要在这里放接口类型声明与一般变量声明
 */

interface RoomMemory {
    AIUreium: AIUreiumRoomMemory;
}

interface AIUreiumRoomMemory {}

interface Creep {
    /**
     * creep放在全局上的memory，在死亡后和全局重置时会重置。
     *
     * @type {GlobalCreepMemory}
     * @memberof Creep
     */
    globalMemory: GlobalCreepMemory;
}
