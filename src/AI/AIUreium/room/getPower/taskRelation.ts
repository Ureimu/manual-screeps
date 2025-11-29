import { DiagramMemory, TaskCollection, TaskRelation } from "utils/Project/type";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { Project } from "utils/Project";
import { registerObjectDeep } from "utils/profiler";
import { createGetPowerBodyParts } from "./tasks/createGetPowerBodyParts";
import { createGPAttackerGroup } from "./tasks/createCreepGroup/createGPAttackerGroup";
import { createGPHealerGroup } from "./tasks/createCreepGroup/createGPHealerGroup";
import { waitForAttackEnd } from "./tasks/gpCarrier/waitForAttackEnd";
import { createGPCarrierGroup } from "./tasks/createCreepGroup/createGPCarrierGroup";
import { finishTask } from "./tasks/finishTask";
import { spawnAttackerAndHealer } from "./tasks/spawnAttackerAndHealer";

export const taskRelation = {
    [createGetPowerBodyParts.name]: [ProjectNetworkDiagram.startNodeName],
    [createGPAttackerGroup.name]: [createGetPowerBodyParts.name],
    [createGPHealerGroup.name]: [createGetPowerBodyParts.name],
    [spawnAttackerAndHealer.name]: [createGPAttackerGroup.name, createGPHealerGroup.name],
    [waitForAttackEnd.name]: [spawnAttackerAndHealer.name],
    [createGPCarrierGroup.name]: [waitForAttackEnd.name],
    [finishTask.name]: [createGPCarrierGroup.name]
};
const taskCollection = registerObjectDeep(
    {
        createGetPowerBodyParts,
        createGPAttackerGroup,
        createGPHealerGroup,
        waitForAttackEnd,
        createGPCarrierGroup,
        finishTask,
        spawnAttackerAndHealer
    },
    "getPowerTaskCollection"
);
export type getPowerTaskArgs = [originRoomName: string, powerBankRoomName: string, powerBankId: string];
class getPowerProject extends Project<getPowerTaskArgs, getPowerTaskArgs> {
    public constructor(taskArgs: getPowerTaskArgs, memoryAddressArgs: getPowerTaskArgs) {
        super("getPowerProject", taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }

    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<getPowerTaskArgs> = taskCollection;
    public getMemory(): DiagramMemory {
        const [originRoomName, powerBankRoomName, powerBankId] = this.taskArgs;
        if (!Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName]) {
            Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName] = {};
        }
        if (!Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId]) {
            Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId] = {};
        }
        return Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId];
    }
    public deleteMemory() {
        const [originRoomName, powerBankRoomName, powerBankId] = this.taskArgs;
        if (typeof Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId] === "object") {
            delete Memory.rooms[originRoomName].AIUreium.getPower[powerBankRoomName][powerBankId];
        }
    }
}

export const getPowerProjectCollection: {
    [originRoomName: string]: { [sourceRoomName: string]: { [sourceName: string]: getPowerProject } };
} = {};
export function getGetPowerProject(...args: getPowerTaskArgs): getPowerProject {
    const [originRoomName, powerBankRoomName, powerBankId] = args;
    if (!(originRoomName in getPowerProjectCollection)) {
        getPowerProjectCollection[originRoomName] = {};
    }
    if (!(powerBankRoomName in getPowerProjectCollection[originRoomName])) {
        getPowerProjectCollection[originRoomName][powerBankRoomName] = {};
    }
    if (!(powerBankId in getPowerProjectCollection[originRoomName][powerBankRoomName])) {
        getPowerProjectCollection[originRoomName][powerBankRoomName][powerBankId] = new getPowerProject(args, args);
    }
    return getPowerProjectCollection[originRoomName][powerBankRoomName][powerBankId];
}
