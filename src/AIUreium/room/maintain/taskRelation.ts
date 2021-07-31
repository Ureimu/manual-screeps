import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { ProjectRunner } from "utils/ProjectRunner";
import { registerFN } from "profiler";
import { buildSourceContainer } from "./tasks/harvester/buildSourceContainer";
import { buildStructureBySource } from "./tasks/builder/buildStructureBySource";
import { buildStructureByStorage } from "./tasks/builder/buildStructureByStorage";
import { carrySource } from "./tasks/carrier/carrySource";
import { carrySourceAndFill } from "./tasks/carrier/carrySourceAndFill";
import { createBuildGroup } from "./tasks/createCreepGroup/createBuildGroup";
import { createCarryGroup } from "./tasks/createCreepGroup/createCarryGroup";
import { createDefaultBodyparts } from "./tasks/createDefaultBodyparts";
import { createFillSpawnGroup } from "./tasks/createCreepGroup/createFillSpawnGroup";
import { createHarvestGroup } from "./tasks/createCreepGroup/createHarvestGroup";
import { createUpgradeGroup } from "./tasks/createCreepGroup/createUpgradeGroup";
import { fillSpawn } from "./tasks/carrier/fillSpawn";
import { keepHarvesting } from "./tasks/harvester/keepHarvesting";
import { structureHasBuilt } from "./tasks/utils/structureHasBuilt";
import { upgradeBySource } from "./tasks/upgrader/upgradeBySource";
import { upgradeByStorage } from "./tasks/upgrader/upgradeByStorage";
import { createScoutGroup } from "./tasks/createCreepGroup/createScoutGroup";
import { createCenterCarryGroup } from "./tasks/createCreepGroup/createCenterCarryGroup";
import { centerTask1 } from "./tasks/centerCarrier/centerTask1";
import { upgradeByLink } from "./tasks/upgrader/upgradeByLink";
import { harvestToLink } from "./tasks/harvester/harvestToLink";
import { stopCarrySource } from "./tasks/carrier/stopCarrySource";

const memoryAddress = (room: Room) => room.memory?.AIUreium?.maintainRoom;

const centerLinkHasBuilt = structureHasBuilt("link", "centerLink", 1);
const sourceLinkHasBuilt = structureHasBuilt("link", "sourceLink", 2);
const controllerLinkHasBuilt = structureHasBuilt("link", "controllerLink", 1);
const storageHasBuilt = structureHasBuilt("storage", "storage", 1);
const terminalHasBuilt = structureHasBuilt("terminal", "terminal", 1);
const factoryHasBuilt = structureHasBuilt("factory", "factory", 1);
const observerHasBuilt = structureHasBuilt("observer", "observer", 1);

const taskRelation = {
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
    [sourceLinkHasBuilt.name]: [buildStructureBySource.name],
    [controllerLinkHasBuilt.name]: [buildStructureBySource.name],
    [centerLinkHasBuilt.name]: [buildStructureBySource.name],
    [terminalHasBuilt.name]: [buildStructureBySource.name],
    [createFillSpawnGroup.name]: [storageHasBuilt.name],
    [fillSpawn.name]: [createFillSpawnGroup.name],
    [carrySource.name]: [createFillSpawnGroup.name],
    [buildStructureByStorage.name]: [storageHasBuilt.name],
    [upgradeByStorage.name]: [storageHasBuilt.name, upgradeBySource.name],
    [createScoutGroup.name]: [storageHasBuilt.name],
    [createCenterCarryGroup.name]: [storageHasBuilt.name, controllerLinkHasBuilt.name, centerLinkHasBuilt.name],
    [centerTask1.name]: [createCenterCarryGroup.name],
    [upgradeByLink.name]: [centerTask1.name, upgradeByStorage.name],
    [factoryHasBuilt.name]: [buildStructureBySource.name],
    [observerHasBuilt.name]: [buildStructureBySource.name],
    [harvestToLink.name]: [sourceLinkHasBuilt.name, centerTask1.name],
    [stopCarrySource.name]: [harvestToLink.name, carrySource.name]
};
const unwrappedTaskCollection = {
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
    carrySource,
    buildStructureByStorage,
    upgradeByStorage,
    createScoutGroup,
    createCenterCarryGroup,
    centerTask1,
    upgradeByLink,
    factoryHasBuilt,
    observerHasBuilt,
    harvestToLink,
    stopCarrySource
};
for (const name in unwrappedTaskCollection) {
    const task = unwrappedTaskCollection[name as keyof typeof unwrappedTaskCollection];
    task.start = registerFN(task.start, "maintainRoom:" + task.name + ":start");
    task.working = registerFN(task.working, "maintainRoom:" + task.name + ":working");
    task.justFinished = registerFN(task.justFinished, "maintainRoom:" + task.name + ":justFinished");
}
const taskCollection = unwrappedTaskCollection;

export function runTasks(room: Room): void {
    const diagram = new ProjectNetworkDiagram(memoryAddress(room));
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

export function resetMaintainTaskProject(room: Room): void {
    if (memoryAddress(room)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(room));
        ProjectRunner.resetTaskDiagram(taskRelation, diagram);
    }
}
