import { stayByRoad } from "frame/creep/action/doOnArrived/stayByRoad";
import { PosStr } from "utils/RoomPositionToStr";
import { checkArray } from "utils/typeCheck";

export function mineralCarrier(creep: Creep, args: string[]): void {
    const [mineralContainerPosStr] = args;
    const pos = PosStr.getPosFromStr(mineralContainerPosStr);

    const mineralContainer = pos.lookFor(LOOK_STRUCTURES).filter(i => i.structureType === "container")[0] as
        | StructureContainer
        | undefined;
    if (!mineralContainer) return;
    const mineral = creep.room.find(FIND_MINERALS)[0];
    if (!mineral) return;
    const storage = creep.room.storage;
    if (!storage) return;
    if (creep.store.getFreeCapacity() !== 0 && mineralContainer.store.getUsedCapacity() > creep.store.getCapacity()) {
        if (creep.pos.isNearTo(mineralContainer)) {
            const storeEntries = Object.entries(mineralContainer.store).filter(([key, value]) => value && value > 0);

            if (storeEntries.length > 0) {
                // choose the resource with the largest amount
                const [resource] = storeEntries.reduce(
                    (maxEntry, entry) => (entry[1] > maxEntry[1] ? entry : maxEntry),
                    storeEntries[0]
                );
                creep.withdraw(mineralContainer, resource as ResourceConstant);
            }
        } else {
            creep.moveTo(mineralContainer);
        }
        return;
    }

    if (
        creep.store.getFreeCapacity() === 0 ||
        (mineralContainer.store.getUsedCapacity() < creep.store.getCapacity() && creep.store.getUsedCapacity() > 0)
    ) {
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
