import { setBodyConfig } from "noobAi/utils/setBodyConfig";

export const setCarrySourceAndFillBody = {
    name: "setCarrySourceAndFillBody",
    run(room: Room) {
        if (!Memory.creepBodyConfig.carrySource) {
            setBodyConfig("carrySource", ["m1c1*3", "m1c1*6", "m1c1*9"]);
        }
        return "fillSpawn";
    },
    description: `挂载body设置`
};
