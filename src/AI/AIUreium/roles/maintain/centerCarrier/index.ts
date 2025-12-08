import { getRoomControlData } from "AI/AIUreium/control";
import { capacityRate } from "AI/AIUreium/control/constants/roomResource";
import { Constant } from "AI/AIUreium/control/constants/roomTaskControl";
import { getRoomResourceLimit } from "AI/AIUreium/control/roomResources";
import { PosStr } from "utils/RoomPositionToStr";

declare global {
    interface CreepMemory {
        centerCarrierLinkState?: boolean;
    }
}

// 还没有factory时的任务
const resourceTypeCache = new Set<ResourceConstant>();
const transferTaskColl: {
    [name: string]: { resourceType: ResourceConstant; isTransferring: boolean; gapSize: number };
} = {};
export function centerCarrierTask2(creep: Creep): void {
    const room = creep.room;
    const centerPosStr = room.memory.construct.centerPos;
    if (!centerPosStr) throw new Error("没有centerPos");
    const centerPos = PosStr.getPosFromStr(centerPosStr);
    // 移动至center位置
    // console.log(`${creep.pos} ${centerPos}`);
    if (!creep.pos.isEqualTo(centerPos)) {
        // console.log("123");
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

    if (!("centerCarrierLinkState" in creep.memory)) {
        creep.memory.centerCarrierLinkState = true;
    }

    const resourceLimit = getRoomResourceLimit(room.name);
    // 切换link工作状态
    if (
        !creep.memory.centerCarrierLinkState &&
        storage.store.energy > resourceLimit.storage.energy.max * getRoomControlData(room.name).controllerLink.start
    ) {
        creep.memory.centerCarrierLinkState = true;
    }
    if (
        creep.memory.centerCarrierLinkState &&
        storage.store.energy < resourceLimit.storage.energy.min * getRoomControlData(room.name).controllerLink.stop
    ) {
        creep.memory.centerCarrierLinkState = false;
    }

    const creepUsedCapacity = creep.store.getUsedCapacity();
    const creepFreeCapacity = creep.store.getFreeCapacity();
    if (!creep.memory.centerCarrierLinkState) {
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

    if (!transferTaskColl[room.name]) {
        const transferTask = {
            resourceType: "" as ResourceConstant,
            isTransferring: false,
            gapSize: 0
        };
        transferTaskColl[room.name] = transferTask;
    }
    const transferTask = transferTaskColl[room.name];

    // 平衡storage和terminal的物资数量
    if (!transferTask.isTransferring) {
        if (creep.store.getUsedCapacity() > 0) {
            creep.transfer(
                storage,
                Object.keys(creep.store).find(
                    resourceType => creep.store[resourceType as ResourceConstant] > 0
                ) as ResourceConstant
            );
            return;
        }
        for (const resourceType of RESOURCES_ALL) {
            if (resourceTypeCache.has(resourceType)) continue;
            let needFillStorage = false;
            const storageStoreNum = storage.store[resourceType] || 1; // 为0会出现无穷大或者报错
            const terminalStoreNum = terminal.store[resourceType] || 1; // 为0会出现无穷大或者报错
            if (
                storageStoreNum < resourceLimit.storage[resourceType].min - creep.store.getCapacity() &&
                terminalStoreNum > 1
            ) {
                needFillStorage = true;
            }
            const gapSize = capacityRate.terminalToStorage - terminalStoreNum / storageStoreNum;
            const gapNumber = Math.abs(terminalStoreNum / capacityRate.terminalToStorage - storageStoreNum);
            resourceTypeCache.add(resourceType);
            // console.log(
            //     `差距比例：${gapSize} 资源：${resourceType}, storage:${storageStoreNum}, terminal:${terminalStoreNum} gap:${(
            //         gapSize * storageStoreNum
            //     ).toFixed(2)} ${(gapSize * terminalStoreNum).toFixed(2)}`
            // );
            if (
                needFillStorage ||
                (Math.abs(gapSize) > 0.05 &&
                    gapNumber > creep.store.getCapacity() &&
                    (terminalStoreNum > 3000 * capacityRate.terminalToStorage || storageStoreNum > 3000))
            ) {
                // console.log(
                //     `差距比例：${gapSize} 资源：${resourceType}, storage:${storageStoreNum}, terminal:${terminalStoreNum}`
                // );
                transferTask.isTransferring = true;
                transferTask.resourceType = resourceType;
                transferTask.gapSize = needFillStorage ? -1 : gapSize;
                // console.log(`creep.withdraw ${gapSize} ${resourceType} ${creep.room.name}`);
                if (transferTask.gapSize > 0) {
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
        // console.log(`creep.transfer ${transferTask.gapSize} ${transferTask.resourceType} ${creep.room.name}`);
        if (transferTask.gapSize > 0) {
            creep.transfer(terminal, transferTask.resourceType);
        } else {
            creep.transfer(storage, transferTask.resourceType);
        }

        return;
    }
}
