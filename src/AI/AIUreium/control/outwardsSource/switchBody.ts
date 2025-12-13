// 在刚获得视野时和间隔一定时间时运行该函数，以获取invader信息。

import {
    getOCarrierBodySuffix,
    OCarryGroupCreepName
} from "AI/AIUreium/projects/outwardsSource/tasks/createCreepGroup/createOCarryGroup";
import { SpawnPool } from "frame/spawn/spawnPool";
import { getRoomConfig } from "../../config";

export function switchBody(roomName: string, sourceRoomName: string, sourceName: string) {
    const setting = getRoomConfig(roomName).outwardsSource;
    const creepName = OCarryGroupCreepName(roomName, sourceName);
    const bodyName = `${creepName}-${getOCarrierBodySuffix(setting.useRoad, setting.useReserver)}`;
    const originBody = Memory.rooms[roomName].spawnPool[creepName]?.creepBodyConfig;
    if (originBody && originBody !== bodyName) {
        SpawnPool.setCreepProperties({
            creepName,
            roomName,
            creepBody: bodyName
        });
    }
}
