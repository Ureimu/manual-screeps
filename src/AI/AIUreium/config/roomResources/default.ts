import { capacityRate } from ".";
import {
    mineralResource,
    compound0Resource,
    compound1Resource,
    compound2Resource,
    compound3Resource,
    compressedResource,
    baseCommodityResource,
    neutralCommodityResource,
    WSCommodityResource,
    WNCommodityResource,
    ENCommodityResource,
    ESCommodityResource
} from "./resourcesConstant";

import { StructureResourceLimit, RoomResourceLimit, SingleResourceLimit } from "./type";

export function transferList<T extends ResourceConstant>(setting: SingleResourceLimit, resList: readonly T[]) {
    const a = {};

    resList.forEach(resName => {
        return _.merge(a, { [resName]: _.cloneDeep(setting) });
    });

    return a as { [resName in T]: SingleResourceLimit };
}
const storageResourceLimit: StructureResourceLimit = {
    energy: {
        max: 350e3,
        min: 100e3,
        maxBuyPrice: 30,
        minSellPrice: 1
    },
    power: {
        max: 20e3,
        min: 0e3,
        maxBuyPrice: 5000,
        minSellPrice: 1000
    },
    ops: {
        max: 10e3,
        min: 0e3,
        maxBuyPrice: 1000,
        minSellPrice: 0
    },
    ...transferList(
        {
            max: 14e3,
            min: 0e3,
            maxBuyPrice: 500,
            minSellPrice: 0
        },
        mineralResource
    ),
    ...transferList(
        {
            max: 8e3,
            min: 0e3,
            maxBuyPrice: 1000,
            minSellPrice: 0
        },
        [...compound0Resource, ...compound1Resource, ...compound2Resource, ...compound3Resource]
    ),
    ...transferList(
        {
            max: 5e3,
            min: 0e3,
            maxBuyPrice: 1e5,
            minSellPrice: 0
        },
        [...compressedResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3,
            maxBuyPrice: 1e5,
            minSellPrice: 0
        },
        [...baseCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3,
            maxBuyPrice: 1e5,
            minSellPrice: 0
        },
        [...neutralCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3,
            maxBuyPrice: 1e6,
            minSellPrice: 0
        },
        [...neutralCommodityResource]
    ),
    ...transferList(
        {
            max: 3e3,
            min: 0e3,
            maxBuyPrice: 1e8,
            minSellPrice: 0
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

export const defaultResourceLimit: RoomResourceLimit = {
    storage: storageResourceLimit,
    terminal: terminalResourceLimit
};
