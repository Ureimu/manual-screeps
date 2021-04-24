import { getGridLayout } from "./composition/gridLayout";
import { runLayout } from "./composition/runLayOut";

declare global {
    // Types defined in a global block are available globally
    interface RoomMemory {
        startTime: number;
        roomControlStatus: number[]; // 用来与上一次建造时做比较，在每次升级时会重新建造一次
        construction: {
            [name: string]: constructionSitesInf<AnyStructure>;
        };
        constructionSchedule: {
            [name: string]: constructionScheduleElement;
        };
        firstSpawnName: string;
    }
}

export interface constructionScheduleElement {
    constructionCompleted: boolean;
    layout?: formedLayout;
    [name: string]: any;
    centerPos?: any;
    firstSpawnPos?: string;
    creepWorkPos?: {
        [name: string]: string[] | undefined;
        harvestSource?: string[];
        upgradeController?: string[];
        centerPos?: string[];
    };
}

export type formedLayout = {
    [structureName in BuildableStructureConstant]?: {
        [name: string]: { posStrList: string[]; levelToBuild?: number };
    };
};

/**
 * RoomPosition字符串，格式为x0y0rE0S0
 */
export type RoomPositionStr = string;

export interface constructionSitesInf<T extends AnyStructure> {
    constructionSitesCompleted: boolean;
    id: Id<T>[];
    pos: RoomPositionStr[];
    structureType: T extends Structure<StructureConstant> ? StructureConstant : never;
    memory: {
        [name: string]: {
            constructionCompleted: boolean;
            hasPushed?: boolean;
            bundledPos?: RoomPositionStr[];
            calculatedPosList?: RoomPositionStr[];
        };
    };
}

function restartConstruction(room: Room): void {
    for (const m in room.memory.construction) {
        room.memory.construction[m].constructionSitesCompleted = false;
    }
}

export function autoConstruction(room: Room): void {
    if (room.memory.roomControlStatus[0] !== room.controller?.level) {
        restartConstruction(room);
        console.log("[build] 房间等级提升，重新检查建筑数量");
    }
    if ((Game.time - room.memory.startTime) % 20000 === 0) {
        restartConstruction(room);
        console.log("[build] 定时检查建筑数量");
    }
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length !== room.memory.roomControlStatus[3]) updateConstruction(room);
    room.memory.roomControlStatus[0] = room.controller?.level as number;
    room.memory.roomControlStatus[1] = room.controller?.progress as number;
    room.memory.roomControlStatus[2] = room.controller?.progressTotal as number;
    room.memory.roomControlStatus[3] = constructionSites.length;
    if ((Game.time - room.memory.startTime) % 100 === 100 - 1) runLayout(room, "gridLayout", getGridLayout);
}

export function updateConstruction(room: Room): void {
    const structures = room.find(FIND_STRUCTURES);
    for (const myStructure of structures) {
        const structureName = myStructure.buildingName();
        if (structureName === "") continue;
        if (!myStructure.room.memory.construction[structureName].memory[myStructure.id])
            myStructure.room.memory.construction[structureName].memory[myStructure.id] = {
                hasPushed: false,
                constructionCompleted: true
            };
    }
}
