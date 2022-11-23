import { chooseBefittingBody } from "frame/creep/body/chooseCondition";
import { bodyTools } from "frame/creep/body/tools";
import { spawnEnqueue } from "frame/spawn/spawnPool/spawnEnqueue";
import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";

// 这里是只需要单个creep本身信息即可决定是否出生的creep孵化控制函数。
// 需要统筹几个creep进行轮班的请参照shiftController。
export const readyCondition: ReadyCondition = {
    loop: (spawnCreepDetail: SpawnCreepDetail): void => {
        const { creepName } = spawnCreepDetail;
        if (!Game.creeps[creepName]) {
            spawnEnqueue(spawnCreepDetail);
        }
    },
    notLoop: (spawnCreepDetail: SpawnCreepDetail): void => {
        return;
    },
    shift: (spawnCreepDetail: SpawnCreepDetail): void => {
        // 未启用。
        const { creepName } = spawnCreepDetail;
        if (!Game.creeps[creepName]) {
            spawnEnqueue(spawnCreepDetail);
        }
        return;
    },
    sub: (spawnCreepDetail: SpawnCreepDetail): void => {
        return;
    }
};

export interface ReadyCondition {
    loop: (spawnCreepDetail: SpawnCreepDetail) => void;
    notLoop: (spawnCreepDetail: SpawnCreepDetail) => void;
    shift: (spawnCreepDetail: SpawnCreepDetail) => void;
    sub: (spawnCreepDetail: SpawnCreepDetail) => void;
}

declare global {
    interface GlobalCreepMemory {
        spawnTimeData?: {
            timeList: number[];
        };
    }
}
