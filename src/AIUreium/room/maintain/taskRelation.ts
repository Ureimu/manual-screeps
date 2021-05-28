import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { ProjectRunner } from "utils/ProjectRunner";
import { buildSourceContainer } from "./tasks/buildSourceContainer";
import { buildStructureBySource } from "./tasks/buildStructureBySource";
import { carrySource } from "./tasks/carrySource";
import { createBuildGroup } from "./tasks/createBuildGroup";
import { createCarryGroup } from "./tasks/createCarryGroup";
import { createDefaultBodyparts } from "./tasks/createDefaultBodyparts";
import { createHarvestGroup } from "./tasks/createHarvestGroup";
import { createUpgradeGroup } from "./tasks/createUpgradeGroup";
import { keepHarvesting } from "./tasks/keepHarvesting";
import { upgradeBySource } from "./tasks/upgradeBySource";

const memoryAddress = (room: Room) => room.memory?.AIUreium?.maintainRoom;

export const taskRelation = {
    [createDefaultBodyparts.name]: [ProjectNetworkDiagram.startNodeName],
    [createHarvestGroup.name]: [createDefaultBodyparts.name],
    [buildSourceContainer.name]: [createHarvestGroup.name],
    [keepHarvesting.name]: [buildSourceContainer.name],
    [createCarryGroup.name]: [createDefaultBodyparts.name, keepHarvesting.name],
    [carrySource.name]: [createCarryGroup.name],
    [createUpgradeGroup.name]: [carrySource.name],
    [upgradeBySource.name]: [createUpgradeGroup.name],
    [createBuildGroup.name]: [createUpgradeGroup.name],
    [buildStructureBySource.name]: [createBuildGroup.name]
};

export const taskCollection = {
    createDefaultBodyparts,
    createHarvestGroup,
    createCarryGroup,
    buildSourceContainer,
    keepHarvesting,
    carrySource,
    createUpgradeGroup,
    upgradeBySource,
    createBuildGroup,
    buildStructureBySource
};

export function runTasks(room: Room): void {
    const diagram = new ProjectNetworkDiagram(memoryAddress(room));
    if (Game.time % 300 === 0) diagram.downloadDiagram();
    if (diagram.nodeNum <= 1) {
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
    ProjectRunner.run<RoomTaskArgs>(taskCollection, diagram, [room]);
}

export function callOnStart(room: Room): void {
    if (memoryAddress(room)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(room));
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
}

export type RoomTaskArgs = [Room];
