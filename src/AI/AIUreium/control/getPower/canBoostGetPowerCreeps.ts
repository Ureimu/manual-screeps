import { getLayoutStructureData } from "frame/construct/utils";
import { bodyTools } from "frame/creep/body/tools";
import { logManager } from "utils/log4screeps";

const logger = logManager.createLogger("debug", "canBoostGetPowerCreeps");
export function canBoostGetPowerCreeps(room: Room, bodyCollection: { [name: string]: string }): boolean {
    if (!room.storage) {
        logger.debug(`no storage, can't boost`);
        return false;
    }
    const fullBoostInfo: {
        byCompound: {
            [boostCompoundName: string]: number;
        };
        energy: {
            [boostCompoundName: string]: number;
        };
    } = { byCompound: {}, energy: {} };
    for (let bodyName in bodyCollection) {
        const body = bodyCollection[bodyName];
        const boostInfo = bodyTools.parseBoostInfo(body);
        // 将 boostInfo 的 byCompound 和 energy 累加到 fullBoostInfo
        if (!boostInfo) continue;
        if (boostInfo.byCompound) {
            for (const compoundName in boostInfo.byCompound) {
                fullBoostInfo.byCompound[compoundName] =
                    (fullBoostInfo.byCompound[compoundName] || 0) + boostInfo.byCompound[compoundName];
            }
        }
        if (boostInfo.energy) {
            for (const compoundName in boostInfo.energy) {
                fullBoostInfo.energy[compoundName] =
                    (fullBoostInfo.energy[compoundName] || 0) + boostInfo.energy[compoundName];
            }
        }
    }

    for (let compoundName in fullBoostInfo.byCompound) {
        const amount = fullBoostInfo.byCompound[compoundName] * LAB_BOOST_MINERAL;
        const myCompoundName = compoundName as ResourceConstant;
        if (room.storage.store[myCompoundName] < amount) {
            logger.debug(`${myCompoundName} ${room.storage.store[myCompoundName]} < ${amount}, can't boost`);
            return false;
        }
    }

    const minEnergy = 10e3;
    if (room.storage.store[RESOURCE_ENERGY] < minEnergy) {
        logger.debug(`${RESOURCE_ENERGY} ${room.storage.store[RESOURCE_ENERGY]} < ${minEnergy}, can't boost`);
        return false;
    }
    const labs = getLayoutStructureData(room.name, "lab", "lab");
    if (labs.length === 0) {
        logger.debug(`${room.name} no lab, can't boost`);
        return false;
    }

    logger.debug(`can boost`);
    return true;
}
