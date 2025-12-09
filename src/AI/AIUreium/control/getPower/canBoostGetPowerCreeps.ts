import { bodyTools } from "frame/creep/body/tools";
import { getRoomResourceLimit } from "../roomResources";

export function canBoostGetPowerCreeps(room: Room, bodyCollection: { [name: string]: string }): boolean {
    const roomLimit = getRoomResourceLimit(room.name);
    if (!room.storage) return false;
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
        if (room.storage.store[myCompoundName] < amount) return false;
    }

    if (room.storage.store[RESOURCE_ENERGY] < 10e3) return false;
    if (room.storage.store.LHO2 < roomLimit.storage.LHO2.min) return false;
    const labs: StructureLab[] = room
        .find(FIND_MY_STRUCTURES)
        .filter<StructureLab>((i): i is StructureLab => i.structureType === "lab");
    if (labs.length === 0) return false;
    return true;
}
