declare global {
    interface RoomMemory {
        construct: ConstructMemory;
    }
}

export interface ConstructMemory {
    startTime: number;
    roomControlStatus: number[]; // 用来与上一次建造时做比较，在每次升级时会重新建造一次
    construction: ConstructionMemory;
    firstSpawnName?: {
        name: string;
        pos: string;
    };
    layout?: formedLayout;
    ifCompleted: boolean;
    centerPos?: string;
    freeSpacePosList?: string[];
}

export type ConstructionMemory = {
    [structureName in StructureConstant]?: StructureInf<structureName>;
};

export type formedLayout = {
    [structureName in BuildableStructureConstant]?: SpecifiedLayoutData<structureName>;
};

export type SpecifiedLayoutData<structureName extends BuildableStructureConstant> = {
    [specifiedName in SpecifiedStructureNameList<structureName>]?: LayoutDataNode;
};

export type FullSpecifiedStructureMemory = {
    [structureName in BuildableStructureConstant]?: {
        [specifiedName in SpecifiedStructureNameList<structureName>]?: SpecifiedStructureInf<
            structureName,
            specifiedName
        >;
    };
};

export interface LayoutDataNode {
    /**
     * posStr,levelToBuild,priority
     *
     * @type {[string, number, number]}
     * @memberof LayoutDataNode
     */
    requireList: LayoutRequireList;
}

export type LayoutRequireList = [posStr: string, levelToBuild: number, priority: number][];

export interface StructureInf<T extends StructureConstant> {
    hasPutSites: boolean;
    hasBuilt: boolean;
    siteList: {
        pos: string;
        id: T extends BuildableStructureConstant ? Id<ConstructionSite<T>> : never;
    }[];
    type: T;
    structureList: {
        pos: string;
        id: Id<ConcreteStructure<T>>;
    }[];
}

export interface SpecifiedStructureInf<T extends StructureConstant, U extends SpecifiedStructureNameList<T>> {
    hasPutSites: boolean;
    hasBuilt: boolean;
    siteList: {
        pos: string;
        id: T extends BuildableStructureConstant ? Id<ConstructionSite<T>> : never;
    }[];
    structureList: {
        pos: string;
        id: Id<ConcreteStructure<T>>;
    }[];
    type: U;
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
