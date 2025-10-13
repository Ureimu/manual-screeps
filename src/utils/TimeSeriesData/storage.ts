/* eslint-disable id-blacklist */

import { SegmentManager } from "utils/SegmentManager";
import { SingleData, SingleTypedTreeData, SingleTypedTreeDataNode } from "./type";
export class TimeSeriesDataStorage<T extends SingleTypedTreeData<U>, U extends SingleData<string>> {
    private rawSeriesDataList: string[];
    public readonly idList: number[];
    public constructor(idList: number[]) {
        this.idList = idList;
        if (idList.length > 100 || idList.some(id => !Number.isInteger(id) || id > 99 || id < 0)) {
            throw Error("idList参数不正确: length>100");
        } else if (idList.some(id => !Number.isInteger(id))) {
            throw Error("idList参数不正确: !Number.isInteger(id)");
        } else if (idList.some(id => id > 99 || id < 0)) {
            throw Error("idList参数不正确: id > 99 || id < 0");
        }
        const rawMemoryList = idList.map(id => SegmentManager.readSegment(id));
        this.rawSeriesDataList = rawMemoryList;
    }

    public getSeriesData(id: number): T {
        if (!this.idList.includes(id)) throw Error("id参数不正确: id不在list中");
        const data = this.rawSeriesDataList[this.idList.findIndex(idInList => idInList === id)];
        if (data && data !== "undefined") {
            return JSON.parse(data) as T;
        } else {
            return {} as T;
        }
    }
    public getSeriesDataSize(id: number): number {
        if (!this.idList.includes(id)) throw Error("id参数不正确: id不在list中");
        return this.rawSeriesDataList[this.idList.findIndex(idInList => idInList === id)]?.length;
    }
    public setSeriesData(id: number, seriesData: T): void {
        if (!this.idList.includes(id)) throw Error("id参数不正确: id不在list中");
        this.rawSeriesDataList[this.idList.findIndex(idInList => idInList === id)] = JSON.stringify(seriesData);
    }
    public save(): void {
        this.rawSeriesDataList.forEach((seriesData, index) =>
            SegmentManager.writeSegment(this.idList[index], seriesData)
        );
    }
}

export function getDataNodeList<
    T extends SingleTypedTreeData<U>,
    U extends SingleData<M>,
    M extends number[] | string | number
>(data: T, list: Record<string, U> = {}, extendedKey = "root"): Record<string, U> {
    if (!data) return list;
    Object.entries(data).forEach(([key, value]) => {
        if (value.type) {
            list[`${extendedKey}.${key}`] = value as U;
        } else {
            getDataNodeList(value as T, list, `${extendedKey}.${key}`);
        }
    });
    return list;
}

export function setDataNodeList<
    T extends SingleTypedTreeData<U>,
    U extends SingleData<M>,
    M extends number[] | string | number
>(list: Record<string, U>, data = {} as T, rootKey = "root", childRunning = false): T {
    if (!list) return data;
    const nextLevelList: Record<string, Record<string, U>> = {};
    Object.entries(list).forEach(([key, value]) => {
        const splitKeyList = key.split(".");
        if (splitKeyList.length === 1) {
            (data[key as keyof T] as SingleData<M>) = value;
        } else {
            const topKey = splitKeyList.shift();
            if (!topKey) throw new Error("how");
            if (!nextLevelList[topKey]) nextLevelList[topKey] = {};
            nextLevelList[topKey][splitKeyList.join(".")] = value;
        }
    });
    Object.entries(nextLevelList).forEach(([key, value]) => {
        (data as SingleTypedTreeData<U>)[key] = setDataNodeList(nextLevelList[key], {}, rootKey, true);
    });

    if (childRunning) {
        return data;
    } else {
        return data[rootKey] as T;
    }
}
