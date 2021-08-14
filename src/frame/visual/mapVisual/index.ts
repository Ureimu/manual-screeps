import { registerFN } from "utils/profiler";
import { roomInf } from "./roomInf";

export const mapVisualForRoom = registerFN((room: Room): void => {
    roomInf(room);
}, "mapVisualForRoom");
