import { DiagramMemory, TaskCollection, TaskRelation } from "utils/Project/type";
import { createOHarvestGroup } from "./tasks/createCreepGroup/createOHarvestGroup";
import { createOBodyParts } from "./tasks/createOBodyParts";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { Project } from "utils/Project";
import { registerObjectDeep } from "utils/profiler";
import { oBuildSourceContainer } from "./tasks/OHarvester/oBuildSourceContainer";
import { oMoveToSource } from "./tasks/OHarvester/oMoveToSource";
import { oKeepHarvesting } from "./tasks/OHarvester/oKeepHarvesting";
import { createOCarryGroup } from "./tasks/createCreepGroup/createOCarryGroup";
import { oCarrySourceToStorage } from "./tasks/OCarrier/oCarrySourceToStorage";
import { createOReserveGroup } from "./tasks/createCreepGroup/createOReserveGroup";
import { oReserving } from "./tasks/OReserver/oReserving";
import { createOBuildGroup } from "./tasks/createCreepGroup/createOBuildGroup";
import { oBuildRoad } from "./tasks/OBuilder/oBuildRoad";

// 设置Project的存储位置

export const taskRelation = {
    [createOBodyParts.name]: [ProjectNetworkDiagram.startNodeName],
    [createOHarvestGroup.name]: [createOBodyParts.name],
    [oMoveToSource.name]: [createOHarvestGroup.name],
    [oBuildSourceContainer.name]: [oMoveToSource.name],
    [oKeepHarvesting.name]: [oBuildSourceContainer.name],
    [createOCarryGroup.name]: [oKeepHarvesting.name],
    [oCarrySourceToStorage.name]: [createOCarryGroup.name],
    [createOReserveGroup.name]: [createOCarryGroup.name],
    [oReserving.name]: [createOReserveGroup.name],
    [createOBuildGroup.name]: [oCarrySourceToStorage.name],
    [oBuildRoad.name]: [createOBuildGroup.name]
};
const taskCollection = registerObjectDeep(
    {
        createOBodyParts,
        createOHarvestGroup,
        oMoveToSource,
        oBuildSourceContainer,
        oKeepHarvesting,
        createOCarryGroup,
        oCarrySourceToStorage,
        createOReserveGroup,
        oReserving,
        createOBuildGroup,
        oBuildRoad
    },
    "outwardsHarvestTaskCollection"
);
export type outwardsSourceTaskArgs = [originRoomName: string, sourceRoomName: string, sourceName: string];
class outwardsHarvestProject extends Project<outwardsSourceTaskArgs, outwardsSourceTaskArgs> {
    public constructor(taskArgs: outwardsSourceTaskArgs, memoryAddressArgs: outwardsSourceTaskArgs) {
        super("outwardsHarvestProject", taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
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
    public deleteMemory() {
        const [originRoomName, sourceRoomName, sourceName] = this.taskArgs;
        if (typeof Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName][sourceName] === "object") {
            delete Memory.rooms[originRoomName].AIUreium.outwardsSource[sourceRoomName][sourceName];
        }
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
