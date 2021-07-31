import { registerFN } from "profiler";
import { roomInf } from "./roomInf";

export const mapVisualForRoom = registerFN((room: Room): void => {
    roomInf(room);
}, "mapVisualForRoom");
