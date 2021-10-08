import { TaskObject, Project } from "utils/Project";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { TaskRelation, TaskCollection, DiagramMemory } from "utils/Project/type";
import { createClaimer } from "./tasks/claimer/createClaimer";
import { deleteClaimer } from "./tasks/claimer/deleteClaimer";
import { createSuccor } from "./tasks/succor/createSuccor";
import { deleteSuccor } from "./tasks/succor/deleteSuccor";

// 设置Project的存储位置
type MemoryAddressArgs = Parameters<(spawnRoomName: string, claimRoomName: string) => void>;
export type newRoomTaskArgs = Parameters<(spawnRoomName: string, claimRoomName: string) => void>;

const taskRelation = {
    [createClaimer.name]: [ProjectNetworkDiagram.startNodeName],
    [deleteClaimer.name]: [createClaimer.name],
    [createSuccor.name]: [deleteClaimer.name],
    [deleteSuccor.name]: [createSuccor.name]
};
const taskCollection = { createClaimer, deleteClaimer, createSuccor, deleteSuccor };
export class NewRoomProject extends Project<newRoomTaskArgs, MemoryAddressArgs> {
    public constructor(taskArgs: newRoomTaskArgs, memoryAddressArgs: MemoryAddressArgs) {
        super(taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
    public name = "newRoom";
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<newRoomTaskArgs> = taskCollection;
    /**
     *  设置Project的存储位置
     *
     * @returns {DiagramMemory}
     * @memberof SampleProject
     */
    public getMemory(): DiagramMemory {
        const [spawnRoomName, claimRoomName] = this.taskArgs;
        if (!Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName])
            Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName] = {};
        return Memory.rooms[spawnRoomName].AIUreium.newRoom[claimRoomName];
    }
}

declare global {
    interface AIUreiumRoomMemory {
        newRoom: { [claimRoomName: string]: DiagramMemory };
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
