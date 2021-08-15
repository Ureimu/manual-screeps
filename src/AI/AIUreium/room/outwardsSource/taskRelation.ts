import { DiagramMemory, TaskCollection, TaskRelation } from "utils/Project/type";
import { createOHarvestGroup } from "./tasks/createOHarvestGroup";
import { createOBodyParts } from "./tasks/createOBodyParts";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { Project } from "utils/Project";
import { registerObjectDeep } from "utils/profiler";
import { oBuildSourceContainer } from "./tasks/OHarvester/oBuildSourceContainer";

// 设置Project的存储位置

export const taskRelation = {
    [createOBodyParts.name]: [ProjectNetworkDiagram.startNodeName],
    [createOHarvestGroup.name]: [createOBodyParts.name],
    [oBuildSourceContainer.name]: [createOHarvestGroup.name]
};
const taskCollection = registerObjectDeep(
    {
        createOBodyParts,
        createOHarvestGroup,
        oBuildSourceContainer
    },
    "outwardsHarvestTaskCollection"
);
export type outwardsSourceTaskArgs = [originRoomName: string, sourceRoomName: string, sourceName: string];
class outwardsHarvestProject extends Project<outwardsSourceTaskArgs, outwardsSourceTaskArgs> {
    public constructor(taskArgs: outwardsSourceTaskArgs, memoryAddressArgs: outwardsSourceTaskArgs) {
        super(taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
    public name = "outwardsHarvestProject";
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<outwardsSourceTaskArgs> = taskCollection;
    public getMemory(): DiagramMemory {
        const [originRoomName, sourceRoomName, sourceName] = this.taskArgs;
        if (!Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName]) {
            Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName] = {};
        }
        if (!Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName][sourceName]) {
            Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName][sourceName] = {};
        }
        return Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName][sourceName];
    }
}

export const outwardsHarvestProjectCollection: {
    [originRoomName: string]: { [sourceRoomName: string]: { [sourceName: string]: outwardsHarvestProject } };
} = {};
export function getOutwardsHarvestProject(...args: outwardsSourceTaskArgs): outwardsHarvestProject {
    const [originRoomName, sourceRoomName, sourceName] = args;
    if (!(originRoomName in outwardsHarvestProjectCollection)) {
        outwardsHarvestProjectCollection[originRoomName] = {};
    }
    if (!(sourceRoomName in outwardsHarvestProjectCollection[originRoomName])) {
        outwardsHarvestProjectCollection[originRoomName][sourceRoomName] = {};
    }
    if (!(sourceName in outwardsHarvestProjectCollection[originRoomName][sourceRoomName])) {
        outwardsHarvestProjectCollection[originRoomName][sourceRoomName][sourceName] = new outwardsHarvestProject(
            args,
            args
        );
    }
    return outwardsHarvestProjectCollection[originRoomName][sourceRoomName][sourceName];
}
