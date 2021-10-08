import { ConstructMemory, formedLayout, SpecifiedOutwardsStructureNameList } from "frame/construct/type";
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
        if (!layout.container) {
            layout.container = {};
        }
        if (!layout.container.sourceContainer) {
            layout.container.sourceContainer = {
                requireList: data.requireData
            };
        } else {
            const sourceContainerLayout = layout.container.sourceContainer;
            sourceContainerLayout.requireList = data.requireData;
        }
        return;
    },
    mineralContainer: (data, layout) => {
        if (!layout.container) {
            layout.container = {};
        }
        if (!layout.container.mineralContainer) {
            layout.container = {
                mineralContainer: {
                    requireList: data.requireData
                }
            };
        } else {
            const mineralContainerLayout = layout.container.mineralContainer;
            mineralContainerLayout.requireList = data.requireData;
        }
        return;
    },
    outwardsSourceRoad: (data, layout) => {
        layout.road = {
            outwardsSourceRoad: {
                requireList: data.path
            }
        };
    },
    passerbyRoad: (data, layout) => {
        layout.road = {
            passerbyRoad: {
                requireList: data.path
            }
        };
    },
    outwardsMineralRoad: (data, layout) => {
        layout.road = {
            outwardsMineralRoad: {
                requireList: data.path
            }
        };
    }
};

type GeneralLayoutFunction<T extends LayoutInputData["type"]> = (
    data: SpecifiedLayoutInputData<T>,
    layout: formedLayout
) => void;

export function baseOutwardsLayout<T extends LayoutInputData["type"]>(data: SpecifiedLayoutInputData<T>): void {
    const layoutRoomMemory = checkLayoutMemory(data.layoutRoomName);
    const layout = layoutRoomMemory.construct.layout;
    if (!layout) return;
    const layoutFunction = baseLayoutFunction[data.type] as GeneralLayoutFunction<T>;
    layoutFunction(data, layout);
}

function checkLayoutMemory(checkRoomName: string): RoomMemory {
    const roomMemory = Memory.rooms[checkRoomName];
    if (!roomMemory) {
        throw Error(`${checkRoomName}的roomMemory不存在！`);
    }
    if (typeof roomMemory.construct === "undefined") {
        (roomMemory.construct as Partial<ConstructMemory>) = {
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
