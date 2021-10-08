import { waitThenLog } from "utils/AcrossTick/utils";

let activeIdList: number[] = [];
let nowTickActiveIdList: number[] = [];
export class SegmentManager {
    public static addId(idList: number[]): number[] {
        const idAddedIntoList: number[] = [];
        const idListClone = _.cloneDeep(idList);
        // waitThenLog(5, `SegmentManager idListClone: ${idListClone.toString()} idList:${idList.toString()}`);
        while (activeIdList.length < 10) {
            const popId = idListClone.pop();
            if (typeof popId !== "number") break;
            // waitThenLog(5, `SegmentManager active: ${popId}, idListClone: ${idListClone.toString()}`);
            activeIdList.push(popId);
            idAddedIntoList.push(popId);
        }
        // if (activeIdList.length >= 10) // waitThenLog(5, activeIdList.toString());
        // waitThenLog(5, `SegmentManager activeList: ${idAddedIntoList.toString()}`);
        return idAddedIntoList;
    }

    public static activeSegment(): void {
        if (activeIdList.length > 0) {
            RawMemory.setActiveSegments(_.cloneDeep(activeIdList));
            // waitThenLog(5, `active: ${activeIdList.toString()}`);
            nowTickActiveIdList = _.cloneDeep(activeIdList);
            activeIdList = [];
        }
    }

    public static isActive(id: number): boolean {
        return nowTickActiveIdList.some(idHere => idHere === id);
    }
}
