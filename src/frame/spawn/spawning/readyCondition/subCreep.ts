import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";

export function getSubCreepName(mainCreepDetail: SpawnCreepDetail, id: number): string {
    return `${mainCreepDetail.creepName}-${id}`;
}

/**
 * 获得当前mainCreep下的所有creep对象
 *
 * @export
 * @param {SpawnCreepDetail} mainCreepDetail
 * @returns {Creep[]}
 */
export function getAliveCreepList(mainCreepDetail: SpawnCreepDetail): Creep[] {
    const allCreepNameList = Object.keys(mainCreepDetail.idList).map(idStr =>
        getSubCreepName(mainCreepDetail, Number(idStr))
    );
    allCreepNameList.push(mainCreepDetail.creepName);
    return allCreepNameList.map(creepName => Game.creeps[creepName]).filter(creep => creep);
}

export function getCreepDetailList(mainCreepDetail: SpawnCreepDetail): SpawnCreepDetail[] {
    const allCreepNameList = Object.keys(mainCreepDetail.idList).map(idStr =>
        getSubCreepName(mainCreepDetail, Number(idStr))
    );
    allCreepNameList.push(mainCreepDetail.creepName);
    return allCreepNameList
        .map(creepName => Memory.rooms[mainCreepDetail.roomName].spawnPool[creepName])
        .filter(creepDetail => creepDetail);
}
