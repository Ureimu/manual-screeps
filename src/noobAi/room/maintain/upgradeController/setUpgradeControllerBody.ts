import { setBodyConfig } from "noobAi/utils/setBodyConfig";

export const setUpgradeControllerBody = {
    name: "setUpgradeControllerBody",
    run: (room: Room) => {
        if (!Memory.creepBodyConfig.upgradeController) {
            setBodyConfig("upgradeController", ["m2w1c1*1", "m2w1c1*2", "m2w1c1*3"]);
        }
        return "upgradeController";
    },
    description: `挂载body设置`
};
