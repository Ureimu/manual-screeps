import { doTaskInSegmentData } from ".";
import { readDataFromSegments } from "./read";

export function callOnStart() {
    doTaskInSegmentData(task => {
        readDataFromSegments(task.args as number[]);
        return "finish";
    });
}
