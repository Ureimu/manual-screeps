import { upgradeController } from "./upgradeController";
import { getStartState } from "../utils/end";
import { setUpgradeControllerBody } from "./setUpgradeControllerBody";
export const upgradeControllerStagePlan = {
    startState: getStartState(setUpgradeControllerBody.name),
    setUpgradeControllerBody,
    upgradeController
};
