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
    }
}

export interface SpawnCreepDetail {
    creepName: string;
    creepBody: string;
    priority: number;
    readyCondition: readyConditionKey;
    state: runningState;
    spawnName?: string;
    roomName: string;
}

export type runningState = "running" | "ready" | "notReady";
export type readyConditionKey = keyof ReadyCondition;
