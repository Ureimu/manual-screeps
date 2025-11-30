import { ReadyCondition } from "frame/spawn/spawning/readyCondition";

declare global {
    interface SpawnMemory {
        spawnQueue: SpawnCreepDetail[];
        recorder?: number;
        lastFinishSpawnTime?: number;
        isSpawning: boolean;
    }

    interface RoomMemory {
        diedCreepList: string[];
        spawnPool: {
            [creepName: string]: SpawnCreepDetail;
        };
        roomEnergy: {
            amount: number;
            tick: number;
        };
    }
}

export interface SpawnCreepDetail {
    creepName: string;
    idList: { [name: number]: boolean };
    creepLevel?: number;
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
