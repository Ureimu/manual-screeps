import { SpecifiedStructureNameList } from "construct/type";

interface baseLayoutInputData {
    type: string;
    layoutRoomName: string;
    structureType: string;
}

interface baseRoadInputData extends baseLayoutInputData {
    structureType: "road";
    type: SpecifiedStructureNameList<"road">;
    path: RoomPosition[];
}

interface baseContainerInputData extends baseLayoutInputData {
    structureType: "container";
    type: SpecifiedStructureNameList<"container">;
    pos: RoomPosition;
}

export interface sourceRoadLayoutData extends baseRoadInputData {
    type: "outwardsSourceRoad";
}

export interface sourceContainerLayoutData extends baseContainerInputData {
    type: "sourceContainer";
    sourceName: string;
}

export interface passerbyRoadLayoutData extends baseRoadInputData {
    type: "passerbyRoad";
    layoutRoomName: string;
}

export type LayoutInputData = sourceRoadLayoutData | passerbyRoadLayoutData | sourceContainerLayoutData;
