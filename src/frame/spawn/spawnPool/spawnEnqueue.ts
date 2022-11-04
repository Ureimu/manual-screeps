import { SpawnCreepDetail } from "./type";

export function spawnEnqueue(creepDetail: SpawnCreepDetail): void {
    creepDetail.state = "ready";
    creepDetail.creepCondition = "queue";
}
