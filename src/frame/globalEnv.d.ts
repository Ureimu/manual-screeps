/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * 环境声明文件，请不要在这里放接口类型声明与一般变量声明
 */

namespace NodeJS {
    interface Global {
        version: string;
        reset: boolean;
        creepMemory: { [creepName: string]: GlobalCreepMemory };
        roomMemory: { [name: string]: GlobalRoomMemory };
    }
}

interface Memory {
    version: string;
}

interface GlobalCreepMemory {}
interface GlobalRoomMemory {}
