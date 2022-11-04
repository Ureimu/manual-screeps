import {
    baseCommodityResource,
    compound0Resource,
    compound1Resource,
    compound2Resource,
    compound3Resource,
    compressedResource,
    ENCommodityResource,
    ESCommodityResource,
    mineralResource,
    neutralCommodityResource,
    WNCommodityResource,
    WSCommodityResource
} from "./resourcesConstant";
import { RoomResourceLimit, StructureResourceLimit } from "./type";

export const sellLimitRate = 1;
export const buyLimitRate = 1;
export const energyCostPrice = 0.09;
export const capacityRate = {
    terminalToStorage: TERMINAL_CAPACITY / STORAGE_CAPACITY
};
function transferList<T extends ResourceConstant>(setting: { min: number; max: number }, resList: readonly T[]) {
    const a = {};

    resList.forEach(resName => {
        return _.merge(a, { [resName]: _.cloneDeep(setting) });
    });

    return a as { [resName in T]: { min: number; max: number } };
}
const storageResourceLimit: StructureResourceLimit = {
    energy: {
        max: 160e3,
        min: 100e3
    },
    power: {
        max: 10e3,
        min: 0e3
    },
    ops: {
        max: 10e3,
        min: 0e3
    },
    ...transferList(
        {
            max: 14e3,
            min: 7e3
        },
        mineralResource
    ),
    ...transferList(
        {
            max: 8e3,
            min: 4e3
        },
        [...compound0Resource, ...compound1Resource, ...compound2Resource, ...compound3Resource]
    ),
    ...transferList(
        {
            max: 5e3,
            min: 3e3
        },
        [...compressedResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3
        },
        [...baseCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3
        },
        [...neutralCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3
        },
        [...neutralCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3
        },
        [...WSCommodityResource, ...WNCommodityResource, ...ENCommodityResource, ...ESCommodityResource]
    )
};

const terminalResourceLimit: StructureResourceLimit = _.cloneDeep(storageResourceLimit);
Object.entries(storageResourceLimit).forEach(([resourceType, limit]) => {
    const limitHere = terminalResourceLimit[resourceType as ResourceConstant];
    if (!resourceType || !limitHere) return;
    limitHere.max = Math.floor(limit.max * capacityRate.terminalToStorage);
    limitHere.min = Math.floor(limit.min * capacityRate.terminalToStorage);
});

export const resourceLimit: RoomResourceLimit = { storage: storageResourceLimit, terminal: terminalResourceLimit };
