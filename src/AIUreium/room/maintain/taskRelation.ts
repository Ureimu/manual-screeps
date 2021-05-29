import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { ProjectRunner } from "utils/ProjectRunner";
import { buildSourceContainer } from "./tasks/buildSourceContainer";
import { buildStructureBySource } from "./tasks/buildStructureBySource";
import { carrySource } from "./tasks/carrySource";
import { carrySourceAndFill } from "./tasks/carrySourceAndFill";
import { createBuildGroup } from "./tasks/createBuildGroup";
import { createCarryGroup } from "./tasks/createCarryGroup";
import { createDefaultBodyparts } from "./tasks/createDefaultBodyparts";
import { createFillSpawnGroup } from "./tasks/createFillSpawnGroup";
import { createHarvestGroup } from "./tasks/createHarvestGroup";
import { createUpgradeGroup } from "./tasks/createUpgradeGroup";
import { fillSpawn } from "./tasks/fillSpawn";
import { keepHarvesting } from "./tasks/keepHarvesting";
import { structureHasBuilt } from "./tasks/structureHasBuilt";
import { upgradeBySource } from "./tasks/upgradeBySource";

const memoryAddress = (room: Room) => room.memory?.AIUreium?.maintainRoom;

const centerLinkHasBuilt = structureHasBuilt("link", "centerLink", 1);
const sourceLinkHasBuilt = structureHasBuilt("link", "sourceLink", 2);
const controllerLinkHasBuilt = structureHasBuilt("link", "controllerLink", 1);
const storageHasBuilt = structureHasBuilt("storage", "storage", 1);
const terminalHasBuilt = structureHasBuilt("terminal", "terminal", 1);

export const taskRelation = {
    [createDefaultBodyparts.name]: [ProjectNetworkDiagram.startNodeName],
    [createHarvestGroup.name]: [createDefaultBodyparts.name],
    [buildSourceContainer.name]: [createHarvestGroup.name],
    [keepHarvesting.name]: [buildSourceContainer.name],
    [createCarryGroup.name]: [createDefaultBodyparts.name, keepHarvesting.name],
    [carrySourceAndFill.name]: [createCarryGroup.name],
    [createUpgradeGroup.name]: [carrySourceAndFill.name],
    [upgradeBySource.name]: [createUpgradeGroup.name],
    [createBuildGroup.name]: [createUpgradeGroup.name],
    [buildStructureBySource.name]: [createBuildGroup.name],
    [storageHasBuilt.name]: [buildStructureBySource.name],
    [terminalHasBuilt.name]: [buildStructureBySource.name],
    [sourceLinkHasBuilt.name]: [buildStructureBySource.name],
    [controllerLinkHasBuilt.name]: [buildStructureBySource.name],
    [centerLinkHasBuilt.name]: [buildStructureBySource.name],
    [createFillSpawnGroup.name]: [storageHasBuilt.name],
    [fillSpawn.name]: [createFillSpawnGroup.name],
    [carrySource.name]: [createFillSpawnGroup.name]
};

export const taskCollection = {
    createDefaultBodyparts,
    createHarvestGroup,
    createCarryGroup,
    buildSourceContainer,
    keepHarvesting,
    carrySourceAndFill,
    createUpgradeGroup,
    upgradeBySource,
    createBuildGroup,
    buildStructureBySource,
    storageHasBuilt,
    terminalHasBuilt,
    sourceLinkHasBuilt,
    controllerLinkHasBuilt,
    centerLinkHasBuilt,
    createFillSpawnGroup,
    fillSpawn,
    carrySource
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
