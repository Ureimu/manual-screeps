declare global {
    interface RoomMemory {
        stats: {
            upgradeSpeed: string;
            creepNum: number;
            creepBodySizeInSpawnQueue: number;
            ticksToUpgrade: string;
        };
    }

    namespace NodeJS {
        interface Global {
            monitor: {
                [roomName: string]: {
                    upgradeSpeed: number[];
                    level: number;
                    time: number;
                };
            };
        }
    }
}
export const adminEast = 1;
