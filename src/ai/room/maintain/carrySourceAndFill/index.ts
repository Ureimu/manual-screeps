import { getStartState } from "../utils/end";
import { fillSpawn } from "./fillSpawn";
import { setCarrySourceAndFillBody } from "./setCarrySourceAndFillBody";

export const carrySourceAndFillStagePlan = {
    startState: getStartState(setCarrySourceAndFillBody.name),
    setCarrySourceAndFillBody,
    fillSpawn
};
