import { mineralResource } from "./resourcesConstant";

export interface RoomResourceLimit {
    storage: StructureResourceLimit;
    terminal: StructureResourceLimit;
}

export type StructureResourceLimit = {
    [name in ResourceConstant]: {
        max: number;
        min: number;
        maxBuyPrice: number;
        minSellPrice: number;
    };
};
export type SingleResourceLimit = {
    max: number;
    min: number;
    maxBuyPrice: number;
    minSellPrice: number;
};
export type ResourceType<T extends readonly ResourceConstant[]> = T extends readonly (infer U)[] ? U : never;
export type MineralResource = ResourceType<typeof mineralResource>;
