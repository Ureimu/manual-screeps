import { SegmentManager } from "utils/SegmentManager";
import { RoomControlData, roomControlDataSegmentNameList } from "./type";

export function writeDataToSegment() {
    const full: { [roomName: string]: RoomControlData } = {};
    _.forEach(global.roomMemory, (roomMemory, roomName) => {
        if (!roomName) return;
        if (!roomMemory.control) return;
        full[roomName] = roomMemory.control;
    });
    const fullStr = JSON.stringify(full);

    // split into 100 KB chunks (100 * 1024 bytes)
    // use 99 * 1000 to avoid unexpected problem
    const CHUNK_SIZE = 99 * 1000;
    const chunks: string[] = [];

    for (let i = 0; i < fullStr.length; i += CHUNK_SIZE) {
        chunks.push(fullStr.slice(i, i + CHUNK_SIZE));
    }

    // write chunks into RawMemory.segments using indices from roomControlDataSegmentNameList
    for (let i = 0; i < chunks.length; i++) {
        const segIndex = roomControlDataSegmentNameList[i];
        if (segIndex === undefined) throw new Error("SegmentMemory outflow in writing chunks of RoomControlData.");
        SegmentManager.writeSegment(segIndex, chunks[i]);
    }
}
