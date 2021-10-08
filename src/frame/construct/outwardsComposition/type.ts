import { LayoutRequireList, SpecifiedOutwardsStructureNameList } from "frame/construct/type";

interface baseLayoutInputData {
    type: SpecifiedOutwardsStructureNameList<"road" | "container">;
    layoutRoomName: string;
    structureType: "road" | "container";
}

interface baseRoadInputData extends baseLayoutInputData {
    structureType: "road";
    type: SpecifiedOutwardsStructureNameList<"road">;
    path: LayoutRequireList;
}

interface baseContainerInputData extends baseLayoutInputData {
    structureType: "container";
    type: SpecifiedOutwardsStructureNameList<"container">;
    requireData: LayoutRequireList;
}

export interface sourceRoadLayoutData extends baseRoadInputData {
    type: "outwardsSourceRoad";
}

export interface sourceContainerLayoutData extends baseContainerInputData {
    type: "sourceContainer";
    sourceName: string;
}

export interface mineralContainerLayoutData extends baseContainerInputData {
    type: "mineralContainer";
    sourceName: string;
}

export interface passerbyRoadLayoutData extends baseRoadInputData {
    type: "passerbyRoad";
    layoutRoomName: string;
}

export interface outwardsMineralRoadLayoutData extends baseRoadInputData {
    type: "outwardsMineralRoad";
    layoutRoomName: string;
}

export type LayoutInputData =
    | sourceRoadLayoutData
    | passerbyRoadLayoutData
    | sourceContainerLayoutData
    | outwardsMineralRoadLayoutData
    | mineralContainerLayoutData;

export type SpecifiedLayoutInputData<T extends SpecifiedOutwardsStructureNameList<BuildableStructureConstant>> =
    T extends "outwardsSourceRoad"
        ? sourceRoadLayoutData
        : T extends "sourceContainer"
        ? sourceContainerLayoutData
        : T extends "passerbyRoad"
        ? passerbyRoadLayoutData
        : T extends "outwardsMineralRoad"
        ? outwardsMineralRoadLayoutData
        : T extends "mineralContainer"
        ? mineralContainerLayoutData
        : never;
