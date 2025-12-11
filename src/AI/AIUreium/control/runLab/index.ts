import { getLayoutStructureData } from "frame/construct/utils";
import { AsyncTask } from "utils/AsyncTask";
import { logManager } from "utils/log4screeps";
import PriorityQueue from "utils/PriorityQueue";
import { TaskPool } from "utils/PriorityQueue/taskPool";
import { addCarryTask } from "../roomCarry";
import { LabAddTaskArgs, LabTask, LabTaskType } from "./type";

const logger = logManager.createLogger("debug", "labTaskPool");

const queueList: { [roomName: string]: PriorityQueue<LabTask> } = {};
const taskPool = new TaskPool<LabTask>();

const callbackName: { [name in LabTaskType]: string } = {
    boostCreep: "onLabCarryTaskFinished:boostCreep",
    reverseReaction: "",
    runReaction: "",
    unboostCreep: ""
};
const taskFuncName: { [name in LabTaskType]: string } = {
    boostCreep: addBoostCarryTask.name,
    reverseReaction: "",
    runReaction: "",
    unboostCreep: ""
};
AsyncTask.mountAsyncFunction(callbackName.boostCreep, ({ args }) => {
    const [roomName, labTaskName] = args as [roomName: string, taskName: string];
    const boostCreepTask = Memory.rooms[roomName].AIUreium.labTaskPool[labTaskName];
    if (!boostCreepTask || boostCreepTask.type !== "boostCreep") return;
    boostCreepTask.isCarryEnd = true;
    logger.debug(
        `carry task finished for lab task ${labTaskName}, lab.store:${boostCreepTask.boostType}:${
            Game.getObjectById(boostCreepTask.labList[0])?.store[boostCreepTask.boostType]
        }`
    );
});

AsyncTask.mountAsyncFunction(addBoostCarryTask.name, task =>
    addBoostCarryTask(...(task.args as Parameters<typeof addBoostCarryTask>))
);

function initTaskPool(roomName: string) {
    if (!queueList[roomName]) {
        const readyTaskList: LabTask[] = [];
        for (const taskName in Memory.rooms[roomName].AIUreium.labTaskPool) {
            const detail = Memory.rooms[roomName].AIUreium.labTaskPool[taskName];
            if (detail.status === "ready") {
                readyTaskList.push(detail);
            }
        }
        queueList[roomName] = taskPool.initQueueFromTaskQueue(readyTaskList);
    }
}

// 当结束任务后和开始任务前时，检查lab是否有多余化合物并移除。
// lab能量值维持任务自动发出。
export function runLabTaskPool(room: Room) {
    if (!room.memory.AIUreium) {
        return;
    }

    // 更新labData，添加新增的lab
    initTaskPool(room.name);

    const labsData = room.memory.AIUreium.labData;
    const layoutLabData = getLayoutStructureData(room.name, "lab", "lab");
    if (layoutLabData.length > Object.keys(labsData).length) {
        layoutLabData.forEach(layoutLab => {
            if (!(layoutLab.id in labsData)) {
                labsData[layoutLab.id] = {
                    running: false,
                    id: layoutLab.id
                };
            }
        });
    }
    const labsNotRunning = _.filter(labsData, (labData, key) => !labData.running);
    if (labsNotRunning.length === 0) return;
    const taskQueue = queueList[room.name];
    do {
        const taskFromQueue = taskQueue.pop();
        if (!taskFromQueue) break;
        // 由于使用的对象来自跨tick的taskQueue，需要确保索引正确才能写到正确的memory位置。
        const task = room.memory.AIUreium.labTaskPool[taskFromQueue.name];

        if (task.type === "boostCreep") {
            logger.debug(`boostCreep lab task:${task.name} is running`);
            task.status = "running";
            const targetLab = labsNotRunning[0];
            task.labList.push(targetLab.id);
            labsData[targetLab.id].running = true;
            labsData[targetLab.id].taskName = task.name;
            const carryTaskName = `boostCreep:${task.creepId}-${task.boostType}`;
            if (!room.storage) break;
            const lab = Game.structures[targetLab.id] as StructureLab | undefined;
            if (!lab) {
                logger.error("no lab exists");
                break;
            }
            if (lab.mineralType !== null && lab.mineralType !== undefined) {
                logger.debug(`lab:${lab.id} has mineral inside:${lab.mineralType}, try clearing`);
                addClearLabTask(task.name, room.name, carryTaskName, [targetLab.id], clearLabTaskNameOnEnd => {
                    AsyncTask.registerAsyncTask({
                        taskName: clearLabTaskNameOnEnd,
                        funcName: taskFuncName[task.type],
                        args: [task.name, room.name, carryTaskName, targetLab.id] as Parameters<
                            typeof addBoostCarryTask
                        >
                    });
                });
            } else {
                addBoostCarryTask(task.name, room.name, carryTaskName, targetLab.id);
            }
        } else {
            logger.error(`${task.type} is not implemented.`);
            taskQueue.push(task);
        }
        // 暂时直接退出
        break;
    } while (labsNotRunning.length > 0);
}

function addClearLabTask(
    labTaskName: string,
    roomName: string,
    carryTaskName: string,
    targetLabIdList: Id<StructureLab>[],
    registerFunc: (clearLabTaskNameOnEnd: string) => void
) {
    const task = Memory.rooms[roomName].AIUreium.labTaskPool[labTaskName];
    const room = Game.rooms[roomName];
    const labs = targetLabIdList.map(id => Game.structures[id] as StructureLab).filter(lab => lab.mineralType);
    const sumObj: { [name: string]: number } = {};
    labs.forEach(lab => {
        const mineralType = lab.mineralType;
        if (mineralType === null || mineralType === undefined) return;
        if (!sumObj[mineralType]) sumObj[mineralType] = 0;
        sumObj[mineralType] += lab.store.getUsedCapacity(mineralType);
    });
    const resources = Object.keys(sumObj) as ResourceConstant[];
    const amounts = Object.values(sumObj);
    const clearLabTaskNameOnEnd = task.name + "-clearLab";
    if (!room.storage) return;

    registerFunc(clearLabTaskNameOnEnd);

    addCarryTask({
        roleName: "carrier",
        roomName: room.name,
        name: carryTaskName + "-clearLab",
        from: targetLabIdList,
        to: [room.storage.id],
        resources,
        priority: 6,
        amounts,
        onTaskEnd: [clearLabTaskNameOnEnd]
    });
}

function addBoostCarryTask(
    labTaskName: string,
    roomName: string,
    carryTaskName: string,
    targetLabId: Id<StructureLab>
) {
    const task = Memory.rooms[roomName].AIUreium.labTaskPool[labTaskName];
    const callbackFuncName = callbackName[task.type];
    const room = Game.rooms[roomName];
    if (!room.storage) return;
    if (task.type !== "boostCreep") return;
    AsyncTask.registerAsyncTask({
        taskName: task.name,
        funcName: callbackFuncName,
        args: [room.name, task.name]
    });
    addCarryTask({
        roleName: "carrier",
        roomName: room.name,
        name: carryTaskName,
        from: [room.storage.id],
        to: [targetLabId],
        resources: [task.boostType],
        priority: 6,
        amounts: [task.bodyPartsCount * LAB_BOOST_MINERAL],
        onTaskEnd: [task.name]
    });
    logger.debug(`carry task added for lab task ${task.name}`);
}

export function addLabTask(roomName: string, task: LabAddTaskArgs): LabTask {
    const labTask: LabTask = {
        ...task,
        status: "ready",
        isCarryEnd: false,
        labList: []
    };
    Memory.rooms[roomName].AIUreium.labTaskPool[task.name] = labTask;
    if (!queueList[roomName]) {
        initTaskPool(roomName);
    }
    queueList[roomName].push(Memory.rooms[roomName].AIUreium.labTaskPool[task.name]);
    return labTask;
}

export function onLabTaskEnd(roomName: string, taskName: string) {
    const room = Game.rooms[roomName];
    const task = room.memory.AIUreium.labTaskPool[taskName];
    logger.debug(`${taskName} end, set memory`);
    task.labList.forEach(labId => {
        room.memory.AIUreium.labData[labId].running = false;
        room.memory.AIUreium.labData[labId].taskName = undefined;
    });
    delete room.memory.AIUreium.labTaskPool[taskName];
    if (task.type === "boostCreep") {
        const creep = Game.getObjectById(task.creepId);
        if (creep) {
            const taskIndex = creep.memory.boostLabTaskNameList.findIndex(i => i === task.name);
            if (taskIndex !== -1) {
                creep.memory.boostLabTaskNameList.splice(taskIndex, 1);
            }
        }
    }
}
