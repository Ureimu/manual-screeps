declare global {
    interface AIUreiumRoomMemory {
        labTaskPool: {
            [taskName: string]: LabTask;
        };
        labData: {
            [labId: string]: {
                running: boolean;
                taskName?: string;
                id: Id<StructureLab>;
            };
        };
    }

    interface CreepMemory {
        boostLabTaskNameList: string[];
    }
}

export type LabTaskType = "boostCreep" | "unboostCreep" | "runReaction" | "reverseReaction";
type LabTaskBoostCreep = {
    type: "boostCreep";
    creepId: Id<Creep>;
    boostType: MineralBoostConstant;
    bodyPartsCount: number;
};
type LabTaskUnboostCreep = {
    type: "unboostCreep";
    creepId: Id<Creep>;
};
type LabTaskRunReaction = {
    type: "runReaction";
    resourceType1: string;
    resourceType2: string;
    resultType: string;
    amount: number;
};
type LabTaskReverseReaction = {
    type: "reverseReaction";
    resourceType: string;
    resultType1: string;
    resultType2: string;
    amount: number;
};
export type LabTask = {
    priority: number;
    status: "ready" | "running";
    name: string;
    isCarryEnd: boolean;
    labList: Id<StructureLab>[];
} & (LabTaskBoostCreep | LabTaskUnboostCreep | LabTaskRunReaction | LabTaskReverseReaction);

export type LabAddTaskArgs = {
    priority: number;
    name: string;
} & (LabTaskBoostCreep | LabTaskUnboostCreep | LabTaskRunReaction | LabTaskReverseReaction);
