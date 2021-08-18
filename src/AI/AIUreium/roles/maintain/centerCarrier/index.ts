import { capacityRate, resourceLimit } from "AI/AIUreium/mainControl/constants/roomResource";
import { PosStr } from "utils/RoomPositionToStr";
// 还没有factory时的任务
let linkState = false;
const resourceTypeCache = new Set<ResourceConstant>();
const transferTask = {
    resourceType: "" as ResourceConstant,
    isTransferring: false,
    gapSize: 0
};
export function centerCarrierTask2(creep: Creep): void {
    const room = creep.room;
    const centerPosStr = room.memory.construct.centerPos;
    if (!centerPosStr) throw new Error("没有centerPos");
    const centerPos = PosStr.getPosFromStr(centerPosStr);
    // 移动至center位置
    if (!creep.pos.isEqualTo(centerPos)) {
        creep.moveTo(centerPos);
        if (!creep.memory.dontPullMe) creep.memory.dontPullMe = true;
        return;
    }

    // 取得建筑
    const storage = room.storage;
    if (!storage) throw new Error("没有storage");
    const terminal = room.terminal;
    if (!terminal) throw new Error("没有terminal");
    const centerLink = centerPos
        .findInRange(FIND_FLAGS, 1)
        .filter(i => i.name.includes("link"))[0]
        .pos.lookFor(LOOK_STRUCTURES)
        .filter(i => i.structureType === "link")[0] as StructureLink;
    if (!centerLink) throw new Error("没有centerLink");

    // 切换link工作状态
    if (linkState && storage.store.energy > resourceLimit.storage.energy.max) {
        linkState = false;
    }
    if (!linkState && storage.store.energy < resourceLimit.storage.energy.min) {
        linkState = true;
    }

    const creepUsedCapacity = creep.store.getUsedCapacity();
    const creepFreeCapacity = creep.store.getFreeCapacity();
    if (!linkState) {
        // link不工作时
        const centerLinkStoreEnergy = centerLink.store[RESOURCE_ENERGY];
        if (centerLinkStoreEnergy > 0 && creepUsedCapacity === 0) {
            creep.withdraw(centerLink, RESOURCE_ENERGY);
            return;
        }
    } else {
        // link工作时
        // 如果空余空间不为0
        const centerLinkFreeCapacity = centerLink.store.getFreeCapacity(RESOURCE_ENERGY);
        // 如果空余空间大于399
        if (centerLinkFreeCapacity > 399) {
            // 如果creep完全空余
            if (creepUsedCapacity === 0) {
                // 从storage拿能量
                creep.withdraw(storage, RESOURCE_ENERGY);
                return;
                // 否则如果creep有energy
            } else if (creep.store[RESOURCE_ENERGY] > 0) {
                // 给centerLink传能量
                creep.transfer(centerLink, RESOURCE_ENERGY);
                return;
            }
        }
    }

    // 平衡storage和terminal的物资数量
    if (!transferTask.isTransferring) {
        for (const resourceType of RESOURCES_ALL) {
            if (resourceTypeCache.has(resourceType)) continue;

            const storageStoreNum = storage.store[resourceType] || 1; // 为0会出现无穷大或者报错
            const terminalStoreNum = terminal.store[resourceType] || 1; // 为0会出现无穷大或者报错
            const gapSize = capacityRate.terminalToStorage - terminalStoreNum / storageStoreNum;
            resourceTypeCache.add(resourceType);
            if (
                Math.abs(gapSize) > 0.05 &&
                (terminalStoreNum > 3000 * capacityRate.terminalToStorage || storageStoreNum > 3000)
            ) {
                // console.log(
                //     `差距比例：${gapSize} 资源：${resourceType}, storage:${storageStoreNum}, terminal:${terminalStoreNum}`
                // );
                transferTask.isTransferring = true;
                transferTask.resourceType = resourceType;
                transferTask.gapSize = gapSize;
                if (gapSize > 0) {
                    creep.withdraw(storage, resourceType);
                } else {
                    creep.withdraw(terminal, resourceType);
                }
                return;
            }
        }

        resourceTypeCache.clear();
    } else {
        transferTask.isTransferring = false;
        if (creepUsedCapacity === 0) {
            return; // 被中途劫了
        }
        if (transferTask.gapSize > 0) {
            creep.transfer(terminal, transferTask.resourceType);
        } else {
            creep.transfer(storage, transferTask.resourceType);
        }

        return;
    }
}
