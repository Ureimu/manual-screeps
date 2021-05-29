declare global {
    interface RoomMemory {
        stats: {
            upgradeSpeed: string;
            creepNum: number;
            creepBodySizeInSpawnQueue: {
                [key: string]: number;
            };
            ticksToUpgrade: string;
        };
    }

    namespace NodeJS {
        interface Global {
            monitor: {
                [roomName: string]: {
                    upgradeSpeed: number[];
                    level: number;
                };
            };
        }
    }
}
export const adminEast = 1;
