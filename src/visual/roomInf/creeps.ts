import { bodyTools } from "creep/body/tools";

/**
 * 取得某一个房间的某个spawn的spawn队列的creep的部件总数。
 *
 * @export
 * @param {string} roomName
 * @returns 某一个房间正在维持的creep的部件总数.
 */
export function getBpSumInSpawnQueue(spawn: StructureSpawn): number {
    let m = 0;
    if (spawn?.memory?.spawnQueue) {
        spawn.memory.spawnQueue.forEach(task => {
            m += bodyTools.getNum(task.creepBody);
        });
        return m;
    } else {
        return 0;
    }
}

/**
 * 取得某一个房间的spawn正在维持的creep的部件总数。
 *
 * @export
 * @param {string} roomName
 * @returns 某一个房间正在维持的creep的部件总数.
 */
export function getCreepNum(roomName: string): number {
    return _.filter(Game.creeps, (k: Creep) => k.name.slice(0, k.name.indexOf("-")) === roomName).length;
}
