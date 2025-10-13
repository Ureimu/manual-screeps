import { waitThenLog } from "utils/AcrossTick/utils";

let activeIdList: number[] = [];
let nowTickActiveIdList: number[] = [];
let writtenIdList: number[] = [];
let lastWriteTick: number = 0;
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

    public static readSegment(id: number): string {
        return RawMemory.segments[id];
    }

    // 每tick只能读取最多10个segment，多于10个会直接报错，且之前存的也无效。
    public static writeSegment(id: number, data: string): void {
        if (lastWriteTick != Game.time) {
            lastWriteTick = Game.time;
            writtenIdList = [];
        }
        if (writtenIdList.length >= 10) throw new Error("cannot write more than 10 segments in one tick");
        if (!writtenIdList.includes(id)) writtenIdList.push(id);
        RawMemory.segments[id] = data;
    }

    public static isActive(id: number): boolean {
        return nowTickActiveIdList.some(idHere => idHere === id);
    }
}
