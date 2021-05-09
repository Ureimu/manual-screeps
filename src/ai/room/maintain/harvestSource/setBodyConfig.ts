import { setBodyConfig } from "ai/utils/setBodyConfig";

export const setHarvestSourceBody = {
    name: "setHarvestSourceBody",
    run: (room: Room) => {
        if (!Memory.creepBodyConfig.harvestSource) {
            setBodyConfig("harvestSource", ["m1w2c1", "m1w2*2c1", "m1w2*3c1"]);
        }
        return "buildSourceContainer";
    },
    description: `挂载body设置`
};
