import { ReadyCondition } from "frame/spawn/spawning/readyCondition";
import { SubCondition } from "../spawning/readyCondition/type";

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
    idList: { [name: number]: boolean };
    creepLevel?: number;
    creepBody: string;
    priority: number;
    spawnCondition: readyConditionKey;
    creepCondition: CreepCondition;
    state: runningState;
    subCond?: SubCondition;
    spawnName?: string;
    spawning?: boolean;
    roomName: string;
}

export type runningState = "running" | "ready" | "notReady";
export type readyConditionKey = keyof ReadyCondition;
export type CreepCondition = "alive" | "dead" | "queue";
