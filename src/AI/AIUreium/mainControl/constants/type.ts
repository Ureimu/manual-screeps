import { mineralResource } from "./resourcesConstant";

export interface RoomResourceLimit {
    storage: StructureResourceLimit;
    terminal: StructureResourceLimit;
}

export type StructureResourceLimit = {
    [name in ResourceConstant]: {
        max: number;
        min: number;
    };
};
export type ResourceType<T extends ResourceConstant[]> = T extends (infer U)[] ? U : never;
export type MineralResource = ResourceType<typeof mineralResource>;
