declare global {
    interface RoomMemory {
        construct: constructMemory;
    }
}

export interface constructMemory {
    startTime: number;
    roomControlStatus: number[]; // 用来与上一次建造时做比较，在每次升级时会重新建造一次
    construction: {
        [structureName in BuildableStructureConstant]?: {
            [name: string]: constructionSiteInf<structureName> | undefined;
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

export interface constructionSiteInf<T extends BuildableStructureConstant> {
    hasPutSites: boolean;
    hasBuilt: boolean;
    sitePosList: { [name: string]: SiteState };
    type: T;
    num: number;
    memory: {
        [name: string]: {
            built: boolean;
            bundledPos?: string[];
            pos: string;
        };
    };
}

export type SiteState = "blank" | "site" | "structure";

export type SpecifiedStructureNameList<T extends BuildableStructureConstant> = T extends "container"
    ? "sourceContainer" | "controllerContainer" | "mineralContainer"
    : T extends "link"
    ? "sourceLink" | "controllerLink" | "centerLink"
    : T extends "road"
    ? "baseRoad" | "sourceAndControllerRoad" | "mineralRoad" | "aroundSpawnRoad" | "outwardsSourceRoad" | "passerbyRoad"
    : T;
