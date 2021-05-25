declare global {
    interface RoomMemory {
        objectNum: {
            [T in ObjectPosType]?: ObjectPosDetail<T>;
        };
    }
}

export type ConstructionSiteConstant = `${BuildableStructureConstant}ConstructionSite`;

export type ObjectPosType = StructureConstant | "source" | "mineral" | ConstructionSiteConstant;

export interface ObjectPosDetail<T> {
    num: number;
    type: T;
}
