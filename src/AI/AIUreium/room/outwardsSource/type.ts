import { TaskObject } from "utils/Project";

export type outwardsSourceTaskArgs = [originRoomName: string, sourceRoomName: string, sourceName: string];
export const outwardsSourceProjectName = "outwardsHarvestProject";
export type outwardsSourceMemoryType = {};
export type outwardsSourceTaskObject = TaskObject<
    outwardsSourceTaskArgs,
    outwardsSourceTaskArgs,
    outwardsSourceMemoryType
>;
