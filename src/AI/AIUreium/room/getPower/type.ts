import { TaskObject } from "utils/Project";

export type getPowerTaskArgs = [originRoomName: string, powerBankRoomName: string, powerBankId: string];
export const getPowerProjectName = "getPowerProject";
export type getPowerProjectMemoryType = {
    boosted?: boolean;
};
export type getPowerTaskObject = TaskObject<getPowerTaskArgs, getPowerTaskArgs, getPowerProjectMemoryType>;
