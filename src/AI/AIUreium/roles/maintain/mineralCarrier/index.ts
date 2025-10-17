import { getStructureIdList } from "frame/construct/utils";
import { stayByRoad } from "frame/creep/action/doOnArrived/stayByRoad";
import { checkArray } from "utils/typeCheck";

export function mineralCarrier(creep: Creep): void {
    const mineralContainerId = getStructureIdList(creep, creep.room.name, { mineralContainer: {} })
        ?.mineralContainer?.[0].id;
    if (!mineralContainerId) return;
    const mineralContainer = Game.getObjectById(mineralContainerId);
    if (!mineralContainer) return;
    const mineral = creep.room.find(FIND_MINERALS)[0];
    if (!mineral) return;
    const storage = creep.room.storage;
    if (!storage) return;
    if (creep.store.getFreeCapacity() !== 0 && mineralContainer.store.getUsedCapacity() > creep.store.getCapacity()) {
        if (creep.pos.isNearTo(mineralContainer)) {
            if (mineralContainer.store[mineral.mineralType] > 0) {
                creep.withdraw(mineralContainer, mineral.mineralType);
            } else {
                creep.withdraw(mineralContainer, RESOURCE_ENERGY);
            }
        } else {
            creep.moveTo(mineralContainer);
        }
        return;
    }

    if (creep.store.getFreeCapacity() === 0) {
        if (creep.pos.isNearTo(storage)) {
            if (creep.store[mineral.mineralType] > 0) {
                creep.transfer(storage, mineral.mineralType);
            } else {
                creep.transfer(storage, RESOURCE_ENERGY);
            }
        } else {
            creep.moveTo(storage);
        }
        return;
    }

    if (creep.room.controller?.my && checkArray(creep.room.memory?.construct?.freeSpacePosList)) {
        stayByRoad.run(creep);
        return;
    }
}
