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
            [name: string]: constructionSiteInf<structureName>;
        };
    };
    firstSpawnName: {
        name: string;
        pos: string;
    };
    layout?: formedLayout;
    ifCompleted: boolean;
    centerPos?: string;
}

export type formedLayout = {
    [structureName in BuildableStructureConstant]?: {
        [name: string]: { posStrList: string[]; levelToBuild?: number };
    };
};

export interface constructionSiteInf<T extends BuildableStructureConstant> {
    hasPutSites: boolean;
    type: T;
    memory: {
        [name: string]: {
            built: boolean;
            bundledPos?: string[];
            pos: string;
        };
    };
}
