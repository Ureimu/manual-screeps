import { ReadyCondition } from "spawn/spawning/readyCondition";

declare global {
    interface SpawnMemory {
        spawnQueue: SpawnCreepDetail[];
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
}

export type runningState = "running" | "ready" | "notReady";
export type readyConditionKey = keyof ReadyCondition;
