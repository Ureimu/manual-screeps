export const Constant = {
    market: {
        sellRate: 15,
        buyEnergy: false
    },
    outwardsSource: {
        defaultStatus: false,
        sourceNum: 4,
        energyRate: {
            start: 1,
            stop: 1.5
        }
    },
    controllerLink: {
        energyRate: {
            start: 0.95,
            stop: 1
        }
    },
    getPower: {
        lowestEnergyInStorage: 8e4,
        spawnAttackerCount: 4
    }
};
