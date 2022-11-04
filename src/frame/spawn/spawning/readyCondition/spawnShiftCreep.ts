import { consoleStyle } from "frame/console/style";
import { chooseBefittingBody } from "frame/creep/body/chooseCondition";
import { bodyTools } from "frame/creep/body/tools";
import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";
import { getAliveCreepList } from "./subCreep";
import { SubCondition } from "./type";
import { numData } from "./utils/numData";
const debug = (msg: string) => console.log(consoleStyle("spawnShiftCreepFunction")(msg, "log"));
export const spawnShiftCreepFunctionSet: {
    [Type in SubCondition]: (mainCreepDetail: SpawnCreepDetail) => boolean;
} = {
    miner: mainCreepDetail => {
        const creepList = getAliveCreepList(mainCreepDetail);
        const sumTicksToLive = creepList.reduce((sum, creep) => {
            return sum + Number(creep.ticksToLive);
        }, 0);
        if (sumTicksToLive < 750) {
            return true;
        }
        return false;
    },
    fighter: mainCreepDetail => {
        const creepList = getAliveCreepList(mainCreepDetail);
        return false;
    },
    worker: mainCreepDetail => {
        const data = numData(mainCreepDetail);
        const creepList = getAliveCreepList(mainCreepDetail);
        debug(`worker: ${JSON.stringify(data)}`);
        if (data.queueNum > 0 || data.aliveNum > 1) {
            return false;
        }
        if (creepList.length === 0) return true;
        return creepList.some(creep => {
            if (
                creep.ticksToLive &&
                creep.ticksToLive <=
                    bodyTools.getNum(
                        chooseBefittingBody({
                            creepBodyConfigName: mainCreepDetail.creepBody,
                            room: Game.rooms[mainCreepDetail.roomName]
                        })
                    ) *
                        CREEP_SPAWN_TIME
            ) {
                debug(`worker: go enqueue`);
                return true;
            } else {
                return false;
            }
        });
    }
};
