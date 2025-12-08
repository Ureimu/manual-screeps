import { defaultResourceLimit } from "./roomResources/default";
import { MainControlData, RoomControlData } from "./type";

export const defaultRoomControlData: RoomControlData = {
    getPower: {
        run: false,
        rooms: [],
        lowestEnergyInStorage: 8e4
    },
    harvestMineral: {
        run: true
    },
    claimNewRoom: {
        run: true
    },
    outwardsSource: {
        run: true,
        maxDistance: 80,
        rooms: [],
        invaderCoreStrategy: "stop",
        invaderStrategy: "stop",
        useRoad: true,
        useReserver: true
    },
    market: {
        buyEnergy: false,
        sellEnergy: true
    },
    upgradeController: {
        run: "onControllerLinkWorks"
    },
    controllerLink: {
        start: 0.95,
        stop: 1
    },
    processPower: {
        run: false,
        energyLimit: 100e3,
        powerLimit: 1e3
    },
    roomResources: { terminalBoundToStorageLimit: true, limit: defaultResourceLimit }
};

export const defaultMainControlData: MainControlData = {
    useProfiler: true
};
