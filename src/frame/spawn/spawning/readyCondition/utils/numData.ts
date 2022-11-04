import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";
import { getAliveCreepList, getCreepDetailList } from "../subCreep";

export interface NumData {
    /**
     * 还活着的creep
     *
     * @type {number}
     * @memberof NumData
     */
    aliveNum: number;
    /**
     * 孵化队列中的creep
     *
     * @type {number}
     * @memberof NumData
     */
    queueNum: number;
    /**
     * 已经死亡的creep（没活过的也有），还未加入孵化队列
     *
     * @type {number}
     * @memberof NumData
     */
    deadNum: number;
}

export function numData(mainCreepDetail: SpawnCreepDetail): NumData {
    const data: NumData = { aliveNum: 0, queueNum: 0, deadNum: 0 };
    const creepDetailList = getCreepDetailList(mainCreepDetail);
    data.aliveNum = creepDetailList.filter(detail => detail.creepCondition === "alive").length;
    data.queueNum = creepDetailList.filter(detail => detail.creepCondition === "queue").length;
    data.deadNum = creepDetailList.filter(detail => detail.creepCondition === "dead").length;
    return data;
}
