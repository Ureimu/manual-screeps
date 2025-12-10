import { RoomCarryTask } from "AI/AIUreium/control/roomCarry";
import { stayByRoad } from "frame/creep/action/doOnArrived/stayByRoad";
import { AsyncTask } from "utils/AsyncTask";
import { logManager } from "utils/log4screeps";
import { PosStr } from "utils/RoomPositionToStr";
import { checkArray } from "utils/typeCheck";

const logger = logManager.createLogger("debug", "generalCarrier");

export function generalCarrier(creep: Creep, carrierType: string) {
    if (carrierType === "centerCarrier") {
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
    }
    if (!creep.memory.carryTaskName) {
        if (carrierType === "carrier") {
            stay(creep);
        }
        return;
    }
    const task = Memory.rooms[creep.room.name].AIUreium.carryTaskPools["carrier"][creep.memory.carryTaskName];

    if (!task || task.status === "end") {
        if (carrierType === "carrier") {
            stay(creep);
        }
        return;
    }

    const indexList = task.indexList;
    const fromIndex = 0;
    const toIndex = 1;
    const resourceIndex = 2;

    // 检测并记录remaining amounts。
    // 只要transfer和withdraw不同时执行，且没有东西给creep传资源，那这里记录就没问题。
    // 根据上次的creep的store数量判定。只检查增量，即withdraw的量。
    // 准确的数量参数有助于减少creep处理多余资源的次数，进而减少cpu使用量。
    const res = task.resources[indexList[resourceIndex]];
    const amountNow = creep.store[res] ?? 0;
    if (task.lastTickStore && amountNow > task.lastTickStore[1]) {
        const lastAmount = task.remainingAmounts[indexList[resourceIndex]];
        // 发生withdraw时，记录remainingAmounts减少量
        if (res === task.lastTickStore[0]) {
            task.remainingAmounts[indexList[resourceIndex]] -= amountNow - task.lastTickStore[1];
        }
        logger.log(
            `${creep.name} ${res} task remaining:${lastAmount} -> ${task.remainingAmounts[indexList[resourceIndex]]}`
        );
    }
    task.lastTickStore = [res, creep.store[res] ?? 0];

    // 处理多余资源
    if (task.isHandlingSurplusResource || task.isHandlingSurplusResourceAtEnd) {
        if (creep.store.getUsedCapacity() !== 0) {
            handleResourceWhenNotEnoughCapacity(creep);
            return;
        } else {
            if (task.isHandlingSurplusResourceAtEnd) {
                task.isHandlingSurplusResourceAtEnd = false;
                task.status = "end";
                logger.debug(`${creep.name} ${task.name} end(2)`);
                onEnd(task);
                return;
            }
            task.isHandlingSurplusResource = false;
            indexList[fromIndex] = 0;
            indexList[toIndex] = 0;
            indexList[resourceIndex]++;
            logger.debug(`${creep.name} ${task.name} switch to ${indexList[resourceIndex]} (2)`);
        }
    }

    // 遍历from容器，按照给定资源列表查询，记录index，直到找到存在的资源，进行拿取。

    // 顺序是，第一层循环为resource，第二层循环为from或to（取决于当前搬运状态）。
    // 即会优先拿取并填满第一种资源，然后在依次进行。

    if (task.isCarrying && (creep.store.getUsedCapacity() === 0 || task.indexList[1] > task.to.length)) {
        if (task.remainingAmounts[indexList[resourceIndex]] <= 0) {
            handleResourceWhenNotEnoughCapacity(creep);
            task.isHandlingSurplusResource = true;
            return;
        }
        task.isCarrying = false;
        logger.debug(`${creep.name} ${task.name} is withdrawing`);
    } else if (
        !task.isCarrying &&
        (creep.store.getFreeCapacity() === 0 ||
            task.indexList[0] > task.from.length ||
            task.remainingAmounts[indexList[resourceIndex]] <= 0)
    ) {
        task.isCarrying = true;
        logger.debug(`${creep.name} ${task.name} is carrying`);
    }

    let direction: "from" | "to";
    let directionIndex: number;
    let storeMethodName: "getUsedCapacity" | "getFreeCapacity";

    if (task.isCarrying) {
        direction = "to";
        directionIndex = toIndex;
        storeMethodName = "getFreeCapacity";
    } else {
        direction = "from";
        directionIndex = fromIndex;
        storeMethodName = "getUsedCapacity";
    }

    // 检测源容器是否有对应资源或目标容器是否有对应资源空位
    let container: AnyStoreStructure | null = null;
    let resource: ResourceConstant = task.resources[indexList[resourceIndex]];

    while (indexList[resourceIndex] < task.resources.length && !container) {
        container = Game.getObjectById(task[direction][indexList[directionIndex]]);
        resource = task.resources[indexList[resourceIndex]];
        while (
            indexList[directionIndex] < task[direction].length &&
            (!container || (container.store[storeMethodName](resource) ?? 0)) === 0
        ) {
            indexList[directionIndex]++;
            container = Game.getObjectById(task[direction][indexList[directionIndex]]);
            logger.debug(
                `${creep.name} ${task.name} ${task.isCarrying} switch container to ${indexList[directionIndex]}`
            );
        }
        if (indexList[directionIndex] >= task[direction].length) {
            // 当不满足源容器有对应资源或目标容器有对应资源空位时，切换到下一个资源。
            if (task.isCarrying) {
                // 先处理当前的资源。
                handleResourceWhenNotEnoughCapacity(creep);
                task.isHandlingSurplusResource = true;
                return;
            }
            indexList[fromIndex] = 0;
            indexList[toIndex] = 0;
            indexList[resourceIndex]++;
            logger.debug(`${creep.name} ${task.name} switch to ${indexList[resourceIndex]} (1)`);
        }
    }
    if (indexList[resourceIndex] >= task.resources.length) {
        //已经不存在任何对应资源或资源空位
        if (!task.isCarrying) {
            task.status = "end";
            logger.debug(`${creep.name} ${task.name} end(1)`);
            onEnd(task);
            return;
        } else {
            // 默认使用storage作为回收位置，用于在搬运时发现目标容器没有资源空位后放置资源。
            // 不存在则直接丢弃资源。
            task.isHandlingSurplusResourceAtEnd = true;
            handleResourceWhenNotEnoughCapacity(creep);
            return;
        }
    }
    if (!container) return;

    if (task.isCarrying) {
        if (!creep.pos.isNearTo(container)) {
            creep.moveTo(container, { range: 1 });
        } else {
            creep.transfer(container, resource);
        }
    } else {
        if (!creep.pos.isNearTo(container)) {
            creep.moveTo(container, { range: 1 });
        } else {
            // 计算拿取资源量的最大值。
            const creepCapacity = creep.store.getFreeCapacity(resource);

            const remainingAmount = task.remainingAmounts[indexList[resourceIndex]];
            const withdrawAmount: number = Math.min(creepCapacity, remainingAmount);

            // 如果已经达到上限，直接切换。
            if (withdrawAmount <= 0) {
                indexList[fromIndex] = 0;
                indexList[toIndex] = 0;
                indexList[resourceIndex]++;
                logger.debug(`${creep.name} ${task.name} switch to ${indexList[resourceIndex]} (3)`);
                return;
            }
            // 执行拿取。
            logger.debug(`${creep.name} ${task.name} withdraw ${resource} x${withdrawAmount}`);
            creep.withdraw(container, resource, withdrawAmount);
        }
    }
}

function handleResourceWhenNotEnoughCapacity(creep: Creep) {
    // 默认使用storage作为回收位置，用于在搬运时发现目标容器没有资源空位后放置资源。
    // 不存在或者已满则直接丢弃资源。
    const firstStoreResource = Object.entries(creep.store).filter(i => i[1] > 0)?.[0]?.[0] as ResourceConstant;
    if (!firstStoreResource) return;
    if (!creep.room.storage) {
        creep.drop(firstStoreResource);
        return;
    }
    if (creep.room.storage.store.getFreeCapacity() === 0) {
        creep.drop(firstStoreResource);
        return;
    }
    if (creep.pos.isNearTo(creep.room.storage)) {
        creep.transfer(creep.room.storage, firstStoreResource);
        return;
    }
}

function stay(creep: Creep) {
    if (creep.room.controller?.my && checkArray(creep.room.memory?.construct?.freeSpacePosList)) {
        stayByRoad.run(creep);
    }
}

function onEnd(task: RoomCarryTask) {
    if (task.onTaskEnd) {
        task.onTaskEnd.forEach(taskName => AsyncTask.runAsyncTask(taskName));
    }
}
