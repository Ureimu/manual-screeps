import { constructMemory } from "construct/type";
import { PosStr } from "utils/RoomPositionToStr";
import { LayoutInputData } from "./type";

export function baseLayout(data: LayoutInputData): void {
    const layoutRoomMemory = checkLayoutMemory(data.layoutRoomName);
    const layout = layoutRoomMemory.construct.layout;
    if (!layout) return;
    if (data.structureType === "road") {
        layout.road = {
            outwardsSourceRoad: {
                posStrList: data.path.map(pos => PosStr.setPosToStr(pos))
            }
        };
    }
    return;
}

function checkLayoutMemory(checkRoomName: string): RoomMemory {
    const roomMemory = Memory.rooms[checkRoomName];
    if (!roomMemory) {
        throw Error(`${checkRoomName}的roomMemory不存在！`);
    }
    if (typeof roomMemory.construct === "undefined") {
        (roomMemory.construct as Partial<constructMemory>) = {
            startTime: Game.time,
            ifCompleted: false,
            construction: {},
            layout: {}
        };
    }
    if (typeof roomMemory.construct.layout === "undefined") {
        roomMemory.construct.layout = {};
    }
    return roomMemory;
}
