import { chooseBefittingBody } from "creep/body/chooseCondition";
import { bodyTools } from "creep/body/tools";
import { SpawnCreepDetail } from "spawn/spawnPool/type";

export const readyCondition: ReadyCondition = {
    loop: (spawnCreepDetail: SpawnCreepDetail): void => {
        const { creepName } = spawnCreepDetail;
        if (!Game.creeps[creepName]) {
            spawnCreepDetail.state = "ready";
        }
    },
    notLoop: (spawnCreepDetail: SpawnCreepDetail): void => {
        return;
    },
    shift: (spawnCreepDetail: SpawnCreepDetail): void => {
        // TODO 进一步完善，目前并不支持轮班制，因为没有轮班产生creep的相关支持
        const { creepName } = spawnCreepDetail;
        const creep = Game.creeps[creepName];
        if (
            !creep ||
            (creep.ticksToLive &&
                creep.ticksToLive <=
                    bodyTools.getNum(
                        chooseBefittingBody({
                            creepBodyConfigName: spawnCreepDetail.creepBody,
                            room: Game.rooms[spawnCreepDetail.roomName]
                        })
                    ) *
                        CREEP_SPAWN_TIME)
        ) {
            spawnCreepDetail.state = "ready";
        }
    }
};

export interface ReadyCondition {
    loop: (spawnCreepDetail: SpawnCreepDetail) => void;
    notLoop: (spawnCreepDetail: SpawnCreepDetail) => void;
    shift: (spawnCreepDetail: SpawnCreepDetail) => void;
}
