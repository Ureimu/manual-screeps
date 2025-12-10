import { logManager } from "utils/log4screeps";

declare global {
    interface AIUreiumRoomMemory {
        carryTaskPools: RoomCarryTaskPool;
    }

    interface CreepMemory {
        carryTaskName?: string;
    }
}

interface RoomCarryTaskPool {
    [roleName: string]: { [taskName: string]: RoomCarryTask };
}

/**
 * 任务有几个阶段，分别是未满足条件（不会在队列内），满足条件但未执行（在队列中），已在执行。
 */

export interface RoomCarryTask {
    name: string;
    from: Id<AnyStoreStructure>[];
    to: Id<AnyStoreStructure>[];
    resources: ResourceConstant[];
    status: "queue" | "start" | "end";
    creep?: string;
    priority: number;
    indexList: [from: number, to: number, resources: number];
    isCarrying: boolean;
    isHandlingSurplusResource: boolean;
    isHandlingSurplusResourceAtEnd: boolean;
    amounts: number[];
    remainingAmounts: number[];
    lastTickStore?: [resource: string, amount: number];
    /**
     * 当任务结束时，要执行的Async Task的taskName、
     *
     */
    onTaskEnd?: string;
}

const minimumLiveTicks = 100;
const logger = logManager.createLogger("debug", "roomCarry");
/**
 * 分发carryTask给carry creep。
 * @param room
 */
export function runRoomCarryTaskPool(room: Room) {
    const taskPools = room.memory.AIUreium.carryTaskPools;
    const roomName = room.name;
    _.forEach(taskPools, (taskPool, roleName) => {
        if (!roleName) return;

        const carryCreepNameList = _.map(Memory.rooms[roomName].spawnPool, i => i.creepName).filter(
            creepName => Memory.creeps[creepName].role === roleName
        );
        // 对已执行的任务进行清理。
        carryCreepNameList.forEach(creepName => {
            const originTaskName = Memory.creeps[creepName].carryTaskName;
            if (originTaskName && taskPool[originTaskName] && taskPool[originTaskName].status === "end") {
                logger.debug(`remove ${originTaskName} from ${creepName}`);
                delete taskPool[originTaskName];
                delete Memory.creeps[creepName].carryTaskName;
            }
        });

        const unsortedTaskList = _.filter(taskPool, i => i.status === "queue");
        if (unsortedTaskList.length === 0) return;

        const aliveCreepNameList = carryCreepNameList.filter(
            creepName =>
                Game.creeps[creepName] &&
                (Game.creeps[creepName].ticksToLive ?? 0) > minimumLiveTicks &&
                !Game.creeps[creepName].spawning
        );
        if (aliveCreepNameList.length === 0) return;

        const taskList = unsortedTaskList.sort((a, b) => b.priority - a.priority);
        let taskIndex = 0;
        // 对queue状态的task进行分配
        aliveCreepNameList.forEach(creepName => {
            if (taskIndex >= taskList.length) return;
            const originTaskName = Memory.creeps[creepName].carryTaskName;
            if (!originTaskName) {
                const task = taskList[taskIndex];
                logger.debug(`${task.name} start, given to ${creepName}`);
                task.status = "start";
                Memory.creeps[creepName].carryTaskName = task.name;
                task.creep = creepName;
                taskIndex += 1;
            }
        });
    });
}

export function addCarryTask(
    roomName: string,
    roleName: CarryRoleName,
    task: {
        name: string;
        from: Id<AnyStoreStructure>[];
        to: Id<AnyStoreStructure>[];
        resources: ResourceConstant[];
        priority: number;
        amounts?: number[];
        onTaskEnd?: string;
    }
) {
    const amountsArg = task.amounts ?? Array(task.resources.length).fill(Infinity);
    const carryTask: RoomCarryTask = {
        name: task.name,
        from: task.from,
        to: task.to,
        resources: task.resources,
        status: "queue",
        priority: task.priority,
        indexList: [0, 0, 0],
        amounts: amountsArg,
        remainingAmounts: _.cloneDeep(amountsArg),
        isCarrying: false,
        isHandlingSurplusResource: false,
        isHandlingSurplusResourceAtEnd: false
    };
    if (task.onTaskEnd) carryTask.onTaskEnd = task.onTaskEnd;
    Memory.rooms[roomName].AIUreium.carryTaskPools[roleName][task.name] = carryTask;
}

export function getCarryTask(roomName: string, roleName: CarryRoleName, taskName: string): RoomCarryTask | undefined {
    return Memory.rooms[roomName]?.AIUreium.carryTaskPools?.[roleName]?.[taskName];
}

export type CarryRoleName = "carrier" | "centerCarrier";
