import { SeparateHarvestAndCarryModel, sourceCalculator } from "screeps-calculator";
import { PathInput } from "screeps-calculator/dist/src/sourceCalculator/inits/path";
import { SeparateHarvestAndCarryModelResult } from "screeps-calculator/dist/src/sourceCalculator/model/SeparateHarvestAndCarryModel";
// cpu消耗0.02左右
export function outwardSourceCalculator(data: {
    harvester: string;
    carrier: string;
    pathData: PathInput;
}): SeparateHarvestAndCarryModelResult {
    const { harvester, carrier, pathData } = data;
    return sourceCalculator(
        new SeparateHarvestAndCarryModel({
            harvester: { type: "creep", data: [{ use: true, body: harvester, boost: {} }] },
            carrier: { type: "creep", data: [{ use: true, body: carrier, boost: { carry: { KH: 5 } } }] },
            container: { type: "container", data: [{ useContainer: true }] },
            source: { type: "source", data: [{ capacity: 3000, powers: {} }] },
            spawn: { type: "spawn", data: [{ powers: {} }] },
            path: {
                type: "path",
                data: [pathData]
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
