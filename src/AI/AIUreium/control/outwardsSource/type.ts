export interface RoomStatusOutwardsSource {
    lastRunTime: number;
    isRunning: boolean;
    sources: {
        [name: string]: {
            isInUse: boolean;
            isChosen: boolean;
            isRemoved: boolean;
            reason: string;
        };
    };
}
