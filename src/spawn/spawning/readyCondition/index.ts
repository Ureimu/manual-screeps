import { SpawnCreepDetail } from "spawn/spawnPool";

export const readyCondition: ReadyCondition = {
    loop: (spawnCreepDetail: SpawnCreepDetail): void => {
        const { creepName } = spawnCreepDetail;
        if (!Game.creeps[creepName]) {
            spawnCreepDetail.state = "ready";
        }
    },
    notLoop: (spawnCreepDetail: SpawnCreepDetail): void => {
        return;
    }
};

export interface ReadyCondition {
    loop: (spawnCreepDetail: SpawnCreepDetail) => void;
    notLoop: (spawnCreepDetail: SpawnCreepDetail) => void;
}