import { ReadyCondition } from "frame/spawn/spawning/readyCondition";

declare global {
    interface SpawnMemory {
        recorder?: number;
        lastFinishSpawnTime?: number;
        isSpawning: boolean;
    }

    interface RoomMemory {
        spawnPool: {
            [creepName: string]: SpawnCreepDetail;
        };
        spawnInfo: {
            energyAmount: number;
            recorder: number;
            diedCreepList: string[];
        };
    }
}

export interface SpawnCreepDetail {
    creepName: string;
    idList: { [name: number]: boolean };
    creepLevel?: number;
    /**
     * creep的部件设定名称
     */
    creepBodyConfig: string;
    /**
     * creep的部件字符串
     */
    creepBody: string;
    priority: number;
    spawnCondition: readyConditionKey;
    creepCondition: CreepCondition;
    state: runningState;
    subCond?: string;
    subCondArgs?: string[];
    spawnName?: string;
    spawning?: boolean;
    roomName: string;
    spawnCount: number;
    /**
     * 从属的project名称。
     *
     * @type {string}
     * @memberof SpawnCreepDetail
     */
    projectName?: string;
}

export type runningState = "running" | "ready" | "notReady";
export type readyConditionKey = keyof ReadyCondition;
export type CreepCondition = "alive" | "dead" | "queue";
