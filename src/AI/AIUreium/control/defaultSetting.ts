import { RoomControlData } from "./type";

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
        invaderStrategy: "stop"
    },
    market: {
        buyEnergy: false
    },
    upgradeController: {
        run: "onControllerLinkWorks"
    },
    controllerLink: {
        start: 0.95,
        stop: 1
    }
};
