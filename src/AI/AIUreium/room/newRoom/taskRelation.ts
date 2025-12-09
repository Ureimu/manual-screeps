import { Project } from "utils/Project";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { TaskRelation, TaskCollection, DiagramMemory } from "utils/Project/type";
import { newRoomTaskArgs, MemoryAddressArgs, newRoomProjectName, newRoomProjectMemoryType } from "./type";
import { createClaimer } from "./tasks/claimer/createClaimer";
import { deleteClaimer } from "./tasks/claimer/deleteClaimer";
import { createSuccor } from "./tasks/succor/createSuccor";
import { deleteSuccor } from "./tasks/succor/deleteSuccor";
import { finishTask } from "./tasks/finishTask";

const taskRelation = {
    [createClaimer.name]: [ProjectNetworkDiagram.startNodeName],
    [deleteClaimer.name]: [createClaimer.name],
    [createSuccor.name]: [deleteClaimer.name],
    [deleteSuccor.name]: [createSuccor.name],
    [finishTask.name]: [deleteSuccor.name]
};
const taskCollection = { createClaimer, deleteClaimer, createSuccor, deleteSuccor, finishTask };
export class NewRoomProject extends Project<newRoomTaskArgs, MemoryAddressArgs, newRoomProjectMemoryType> {
    public constructor(taskArgs: newRoomTaskArgs, memoryAddressArgs: MemoryAddressArgs) {
        super(newRoomProjectName, taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<newRoomTaskArgs, MemoryAddressArgs, newRoomProjectMemoryType> =
        taskCollection;
    /**
     *  设置Project的存储位置
     *
     * @returns {DiagramMemory}
     * @memberof SampleProject
     */
    public getMemoryStorage(): DiagramMemory<newRoomProjectMemoryType> {
        const [spawnRoomName, claimRoomName] = this.taskArgs;
        if (!Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName])
            Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName] = { memory: {} };
        return Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName];
    }
    public deleteMemoryStorage() {
        const [spawnRoomName, claimRoomName] = this.taskArgs;
        if (typeof Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName] === "object") {
            delete Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName];
        }
        if (newRoomProjectCollection[spawnRoomName]?.[claimRoomName]) {
            delete newRoomProjectCollection[spawnRoomName][claimRoomName];
        }
    }
}

declare global {
    interface AIUreiumRoomMemory {
        newRoom: { [claimRoomName: string]: DiagramMemory<newRoomProjectMemoryType> };
    }
}

export const newRoomProjectCollection: {
    [spawnRoomName: string]: { [claimRoomName: string]: NewRoomProject };
} = {};
export function getNewRoomProject(...args: newRoomTaskArgs): NewRoomProject {
    const [spawnRoomName, claimRoomName] = args;
    if (!(spawnRoomName in newRoomProjectCollection)) {
        newRoomProjectCollection[spawnRoomName] = {};
    }
    if (!(claimRoomName in newRoomProjectCollection[spawnRoomName])) {
        newRoomProjectCollection[spawnRoomName][claimRoomName] = new NewRoomProject(args, args);
    }
    return newRoomProjectCollection[spawnRoomName][claimRoomName];
}
