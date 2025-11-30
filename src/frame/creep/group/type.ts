declare global {
    interface Memory {
        creepGroups: {
            [creepGroupName: string]: CreepGroupMemory<CreepGroupMode>;
        };
    }

    interface CreepMemory {
        groupName: string;
    }
}
/**
 *
 *
 * @export
 * @interface creepGroupDetail
 */
export interface creepGroupDetail {
    creepNameList: string[];
}

export type CreepGroupMemory<T extends CreepGroupMode> = T extends "route"
    ? {
          mode: "route";
          creepNameList: string[];
          routeName?: string;
          ifShow: boolean;
          arguments: string[];
          projectName?: string;
      }
    : T extends "role"
    ? {
          mode: "role";
          creepNameList: string[];
          roleName?: string;
          ifShow: boolean;
          arguments: string[];
          projectName?: string;
      }
    : never;

export type CreepGroupMode = "route" | "role";

export function creepGroupModeIsRoute(memory: CreepGroupMemory<CreepGroupMode>): memory is CreepGroupMemory<"route"> {
    return memory.mode === "route";
}
