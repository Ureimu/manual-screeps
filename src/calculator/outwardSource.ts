import { SeparateHarvestAndCarryModel, sourceCalculator } from "screeps-calculator";
// cpu消耗0.02左右
export function outwardSourceCalculator(): void {
    sourceCalculator(
        new SeparateHarvestAndCarryModel({
            harvester: { type: "creep", data: [{ use: true, body: "w5c1m3", boost: {} }] },
            carrier: { type: "creep", data: [{ use: true, body: "c9m5w1", boost: { carry: { KH: 5 } } }] },
            container: { type: "container", data: [{ useContainer: true }] },
            source: { type: "source", data: [{ capacity: 3000, powers: {} }] },
            spawn: { type: "spawn", data: [{ powers: {} }] },
            path: {
                type: "path",
                data: [
                    {
                        ownedRoomPathLength: { plain: 0, swamp: 0, road: 30 },
                        reservePathLength: { plain: 10, swamp: 20, road: 10 },
                        outwardsRoomPathLength: { plain: 0, swamp: 0, road: 30 }
                    }
                ]
            },
            link: {
                type: "link",
                data: [{ useLink: true }]
            },
            reserver: {
                type: "creep",
                data: [{ use: true, body: "m2i2", boost: {} }]
            }
        })
    );
}
