import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { ProjectRunner } from "utils/ProjectRunner";
import { createCarryGroup } from "./tasks/createCarryGroup";
import { createDefaultBodyparts } from "./tasks/createDefaultBodyparts";
import { createHarvestGroup } from "./tasks/createHarvestGroup";

export const taskRelation = {
    [createDefaultBodyparts.name]: [ProjectNetworkDiagram.startNodeName],
    [createHarvestGroup.name]: [createDefaultBodyparts.name],
    [createCarryGroup.name]: [createDefaultBodyparts.name]
};

export const taskCollection = {
    createDefaultBodyparts,
    createHarvestGroup,
    createCarryGroup
};

export function runTasks(room: Room): void {
    const diagram = new ProjectNetworkDiagram(room.memory.AIUreium.maintainRoom);
    if (diagram.nodeNum <= 1) {
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
    ProjectRunner.run<RoomTaskArgs>(taskCollection, diagram, [room]);
}

export type RoomTaskArgs = [Room];
