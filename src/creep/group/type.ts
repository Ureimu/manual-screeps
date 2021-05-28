declare global {
    interface Memory {
        creepGroups: {
            [creepGroupName: string]: {
                creepNameList: string[];
                routeName?: string;
                ifShow: boolean;
            };
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
