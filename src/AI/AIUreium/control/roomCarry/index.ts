declare global {
    interface AIUreiumRoomMemory {
        carryTaskPools: RoomCarryTaskPool;
    }

    interface CreepMemory {
        carryTask?: RoomCarryTask;
    }
}

interface RoomCarryTaskPool {
    [roleName: string]: { [taskName: string]: RoomCarryTask };
}

/**
 * 任务有几个阶段，分别是未满足条件（不会在队列内），满足条件但未执行（在队列中），已在执行。
 */

interface RoomCarryTask {
    name: string;
    from: Id<AnyStoreStructure>[];
    to: Id<AnyStoreStructure>[];
    resources: ResourceConstant[];
    status: "queue" | "start" | "end";
    creep?: string;
    priority: number;
}

const minimumLiveTicks = 100;

/**
 * 分发carryTask给carry creep。
 * @param room
 */
export function roomCarry(room: Room) {
    if (!room.memory.AIUreium.carryTaskPools) {
        room.memory.AIUreium.carryTaskPools = {
            carry: {},
            centerCarry: {}
        };
    }
    const taskPools = room.memory.AIUreium.carryTaskPools;
    const roomName = room.name;
    _.forEach(taskPools, (taskPool, roleName) => {
        const unsortedTaskList = _.filter(taskPool, i => i.status === "queue");
        if (unsortedTaskList.length === 0) return;
        if (!roleName) return;
        const carryCreepNameList = _.map(Memory.rooms[roomName].spawnPool, i => i.creepName).filter(
            creepName => Memory.creeps[creepName].role === roleName
        );
        const aliveCreepNameList = carryCreepNameList.filter(
            creepName => (Game.creeps[creepName]?.ticksToLive ?? 0) > minimumLiveTicks
        );
        if (aliveCreepNameList.length === 0) return;

        // 对已执行的任务进行清理。
        carryCreepNameList.forEach(creepName => {
            const originTask = Memory.creeps[creepName].carryTask;
            if (originTask && originTask.status === "end") {
                delete taskPool[originTask.name];
                delete Memory.creeps[creepName].carryTask;
            }
        });

        const taskList = unsortedTaskList.sort((a, b) => b.priority - a.priority);
        let taskIndex = 0;
        // 对queue状态的task进行分配
        aliveCreepNameList.forEach(creepName => {
            if (taskIndex >= taskList.length) return;
            const originTask = Memory.creeps[creepName].carryTask;
            if ((originTask && originTask.status === "end") || !originTask) {
                Memory.creeps[creepName].carryTask = taskList[taskIndex];
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
    }
) {
    const carryTask: RoomCarryTask = {
        name: task.name,
        from: task.from,
        to: task.to,
        resources: task.resources,
        status: "queue",
        priority: task.priority
    };
    Memory.rooms[roomName].AIUreium.carryTaskPools[roleName][task.name] = carryTask;
}

export type CarryRoleName = "carry" | "centerCarry";
