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
import { fillSpawn } from "./tasks/spawnFiller/fillSpawn";
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
import { startOutwardsSourceTask } from "./tasks/startOutwardsSource";
import { Project, startNodeName } from "utils/Project";
import { TaskRelation, TaskCollection, DiagramMemory } from "utils/Project/type";
import { registerObjectDeep } from "utils/profiler";
import { createMineGroup } from "./tasks/createCreepGroup/createMineGroup";
import { keepMining } from "./tasks/miner/keepMining";
import { centerTask2 } from "./tasks/centerCarrier/centerTask2";
import { startNewRoomTask } from "./tasks/startNewRoomTask";
import { createMineCarryGroup } from "./tasks/createCreepGroup/createMineCarryGroup";
import { stopScout } from "./tasks/scouter/stopScout";
import { initAiUreimuRoomMemory } from "../utils";
import { startGetPowerTask } from "./tasks/startGetPowerTask";
import { createKeepLevelGroup } from "./tasks/createCreepGroup/createKeepLevelGroup";

const centerLinkHasBuilt = structureHasBuilt("link", "centerLink", 1);
const sourceLinkHasBuilt = structureHasBuilt("link", "sourceLink", 2);
const controllerLinkHasBuilt = structureHasBuilt("link", "controllerLink", 1);
const storageHasBuilt = structureHasBuilt("storage", "storage", 1);
const terminalHasBuilt = structureHasBuilt("terminal", "terminal", 1);
const factoryHasBuilt = structureHasBuilt("factory", "factory", 1);
const observerHasBuilt = structureHasBuilt("observer", "observer", 1);
const mineralContainerHasBuilt = structureHasBuilt("container", "mineralContainer", 1);
const extractorHasBuilt = structureHasBuilt("extractor", "extractor", 1);

const taskRelation = {
    [createDefaultBodyparts.name]: [startNodeName],
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
    [stopCarrySource.name]: [harvestToLink.name, carrySource.name],
    [startOutwardsSourceTask.name]: [createScoutGroup.name],
    [startNewRoomTask.name]: [createScoutGroup.name],
    [extractorHasBuilt.name]: [storageHasBuilt.name],
    [mineralContainerHasBuilt.name]: [extractorHasBuilt.name],
    [createMineGroup.name]: [mineralContainerHasBuilt.name],
    [keepMining.name]: [createMineGroup.name],
    [createMineCarryGroup.name]: [keepMining.name],
    [centerTask2.name]: [centerTask1.name, terminalHasBuilt.name],
    [stopScout.name]: [observerHasBuilt.name],
    [startGetPowerTask.name]: [observerHasBuilt.name],
    [createKeepLevelGroup.name]: [createDefaultBodyparts.name]
};
const taskCollection = registerObjectDeep(
    {
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
        stopCarrySource,
        startOutwardsSourceTask,
        mineralContainerHasBuilt,
        extractorHasBuilt,
        createMineGroup,
        keepMining,
        centerTask2,
        startNewRoomTask,
        createMineCarryGroup,
        stopScout,
        startGetPowerTask,
        createKeepLevelGroup
    },
    "maintainRoomProjectTaskCollection"
);
export type maintainRoomTaskArgs = [roomName: string];
export class maintainRoomProject extends Project<maintainRoomTaskArgs, maintainRoomTaskArgs> {
    public constructor(taskArgs: maintainRoomTaskArgs, memoryAddressArgs: maintainRoomTaskArgs) {
        super(taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
    public name = "maintainRoomProject";
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<maintainRoomTaskArgs> = taskCollection;
    public getMemory(): DiagramMemory {
        if (!Memory.rooms) Memory.rooms = {};
        if (!Memory.rooms[this.taskArgs[0]]) {
            (Memory.rooms[this.taskArgs[0]] as Partial<RoomMemory>) = {};
        }
        if (!Memory.rooms[this.taskArgs[0]].AIUreium) {
            Memory.rooms[this.taskArgs[0]].AIUreium = initAiUreimuRoomMemory();
        }
        return Memory.rooms?.[this.taskArgs[0]]?.AIUreium?.maintainRoom;
    }
}

export const maintainRoomProjectCollection: {
    [roomName: string]: maintainRoomProject;
} = {};
export function getMaintainRoomProject(...args: maintainRoomTaskArgs): maintainRoomProject {
    const [roomName] = args;
    if (!(roomName in maintainRoomProjectCollection)) {
        maintainRoomProjectCollection[roomName] = new maintainRoomProject(args, args);
    }
    return maintainRoomProjectCollection[roomName];
}
