declare global {
    interface RoomMemory {
        construct: constructMemory;
    }
}

export interface constructMemory {
    startTime: number;
    roomControlStatus: number[]; // 用来与上一次建造时做比较，在每次升级时会重新建造一次
    construction: {
        [structureName in StructureConstant]?: {
            [name: string]: StructureInf<structureName> | undefined;
        };
    };
    firstSpawnName: {
        name: string;
        pos: string;
    };
    layout?: formedLayout;
    ifCompleted: boolean;
    centerPos?: string;
    freeSpacePosList?: string[];
}

export type formedLayout = {
    [structureName in BuildableStructureConstant]?: {
        [specifiedName in SpecifiedStructureNameList<structureName>]?: {
            posStrList: string[];
            levelToBuild?: number;
        };
    };
};

export interface StructureInf<T extends StructureConstant> {
    hasPutSites: boolean;
    hasBuilt: boolean;
    sitePosList: { [name: string]: SiteState };
    type: T;
    num: number;
    memory: {
        [name: string]: {
            built?: boolean;
            pos: string;
            id: Id<ConcreteStructure<T>>;
        };
    };
}

export type SiteState = "blank" | "site" | "structure";

export type SpecifiedStructureNameList<T extends StructureConstant> = T extends "container"
    ? "sourceContainer" | "controllerContainer" | "mineralContainer" | SpecifiedOutwardsStructureNameList<T>
    : T extends "link"
    ? "sourceLink" | "controllerLink" | "centerLink" | SpecifiedOutwardsStructureNameList<T>
    : T extends "road"
    ? "baseRoad" | "sourceAndControllerRoad" | "mineralRoad" | "aroundSpawnRoad" | SpecifiedOutwardsStructureNameList<T>
    : T;

export type StructureTypeFromSpecifiedStructureName<T extends SpecifiedStructureNameList<StructureConstant>> =
    T extends SpecifiedStructureNameList<"container">
        ? "container"
        : T extends SpecifiedStructureNameList<"link">
        ? "link"
        : T extends SpecifiedStructureNameList<"road">
        ? "road"
        : T;

export type SpecifiedOutwardsStructureNameList<T extends StructureConstant> = T extends "container"
    ? "sourceContainer" | "mineralContainer"
    : T extends "road"
    ? "outwardsSourceRoad" | "passerbyRoad" | "outwardsMineralRoad"
    : never;

export function getStructureTypeBySpecifiedName<T extends SpecifiedStructureNameList<StructureConstant>>(
    name: T
): StructureTypeFromSpecifiedStructureName<T> {
    if (["sourceContainer", "controllerContainer", "mineralContainer"].includes(name))
        return "container" as StructureTypeFromSpecifiedStructureName<T>;
    if (["sourceLink", "controllerLink", "centerLink"].includes(name))
        return "link" as StructureTypeFromSpecifiedStructureName<T>;
    if (
        [
            "baseRoad",
            "sourceAndControllerRoad",
            "mineralRoad",
            "aroundSpawnRoad",
            "outwardsSourceRoad",
            "passerbyRoad",
            "outwardsMineralRoad"
        ].includes(name)
    )
        return "road" as StructureTypeFromSpecifiedStructureName<T>;
    return name as StructureTypeFromSpecifiedStructureName<T>;
}
