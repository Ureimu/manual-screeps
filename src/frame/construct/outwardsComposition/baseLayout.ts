import { constructMemory, formedLayout, SpecifiedOutwardsStructureNameList } from "frame/construct/type";
import { PosStr } from "utils/RoomPositionToStr";
import { SetTools } from "utils/SetTools";
import { LayoutInputData, SpecifiedLayoutInputData } from "./type";

const baseLayoutFunction: {
    [Name in SpecifiedOutwardsStructureNameList<BuildableStructureConstant>]: (
        data: SpecifiedLayoutInputData<Name>,
        layout: formedLayout
    ) => void;
} = {
    sourceContainer: (data, layout) => {
        if (!layout.container?.sourceContainer) {
            layout.container = {
                sourceContainer: {
                    posStrList: data.pos
                }
            };
        } else {
            const sourceContainerLayout = layout.container.sourceContainer;
            sourceContainerLayout.posStrList = SetTools.mergeUniqueList(sourceContainerLayout.posStrList, data.pos);
        }
        return;
    },
    mineralContainer: (data, layout) => {
        if (!layout.container?.mineralContainer) {
            layout.container = {
                mineralContainer: {
                    posStrList: data.pos
                }
            };
        } else {
            const mineralContainerLayout = layout.container.mineralContainer;
            mineralContainerLayout.posStrList = SetTools.mergeUniqueList(mineralContainerLayout.posStrList, data.pos);
        }
        return;
    },
    outwardsSourceRoad: (data, layout) => {
        layout.road = {
            outwardsSourceRoad: {
                posStrList: data.path
            }
        };
    },
    passerbyRoad: (data, layout) => {
        layout.road = {
            passerbyRoad: {
                posStrList: data.path
            }
        };
    },
    outwardsMineralRoad: (data, layout) => {
        layout.road = {
            outwardsMineralRoad: {
                posStrList: data.path
            }
        };
    }
};

export function baseOutwardsLayout<T extends LayoutInputData["type"]>(data: SpecifiedLayoutInputData<T>): void {
    const layoutRoomMemory = checkLayoutMemory(data.layoutRoomName);
    const layout = layoutRoomMemory.construct.layout;
    if (!layout) return;
    const layoutFunction = baseLayoutFunction[data.type] as (
        data: SpecifiedLayoutInputData<T>,
        layout: formedLayout
    ) => void;
    layoutFunction(data, layout);
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
