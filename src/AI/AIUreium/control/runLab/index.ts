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
AsyncTask.mountAsyncFunction(callbackName.boostCreep, ({ args }) => {
    const [roomName, labTaskName] = args as [roomName: string, taskName: string];
    const boostCreepTask = Memory.rooms[roomName].AIUreium.labTaskPool[labTaskName];
    if (boostCreepTask.type !== "boostCreep") return;
    boostCreepTask.isCarryEnd = true;
});

// 当结束任务后和开始任务前时，检查lab是否有多余化合物并移除。
// lab能量值维持任务自动发出。
export function runLabTaskPool(room: Room) {
    const labsMemory = room.memory.AIUreium.labData;
    const labsData = room.memory.AIUreium.labData;
    const labs = _.filter(labsMemory, (labData, key) => !labData.running);
    if (labs.length === 0) return;
    if (!queueList[room.name]) {
        const readyTaskList: LabTask[] = [];
        for (const taskName in room.memory.AIUreium.labTaskPool) {
            const detail = room.memory.AIUreium.labTaskPool[taskName];
            if (detail.status === "ready") {
                readyTaskList.push(detail);
            }
        }
        queueList[room.name] = taskPool.initQueueFromTaskQueue(readyTaskList);
    }

    const taskQueue = queueList[room.name];
    do {
        const task = taskQueue.pop();
        if (!task) break;

        if (task.type === "boostCreep") {
            task.status = "running";
            const targetLab = labs[0];
            task.labList.push(labs[0].id);
            labsData[targetLab.id].running = true;
            labsData[targetLab.id].taskName = task.name;
            const carryTaskName = `boostCreep:${task.creepId}-${task.boostType}`;
            if (!room.storage) break;
            const callbackFuncName = callbackName[task.type];
            AsyncTask.registerAsyncTask({
                taskName: task.name,
                funcName: callbackFuncName,
                args: [room.name, task.name]
            });
            addCarryTask(room.name, "carrier", {
                name: carryTaskName,
                from: [room.storage.id],
                to: [targetLab.id],
                resources: [task.boostType],
                priority: 6,
                amounts: [task.bodyPartsCount * LAB_BOOST_MINERAL],
                onTaskEnd: callbackFuncName
            });
        } else {
            logger.error(`${task.type} is not implemented.`);
            taskQueue.push(task);
            break;
        }
    } while (labs.length > 0);
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
        throw new Error("addLabTask在runLabTaskPool之前执行，导致queueList[roomName]没有初始化。");
    }
    queueList[roomName].push(labTask);
    return labTask;
}

export function onLabTaskEnd(roomName: string, taskName: string) {
    const room = Game.rooms[roomName];
    const task = room.memory.AIUreium.labTaskPool[taskName];
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
