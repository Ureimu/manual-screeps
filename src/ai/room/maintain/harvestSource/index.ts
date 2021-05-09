import { endState, getStartState } from "../utils/end";
import { buildSourceContainer } from "./buildSourceContainer";
import { keepHarvesting } from "./keepHarvesting";
import { setHarvestSourceBody } from "./setBodyConfig";

export const harvestSourceStagePlan = {
    startState: getStartState(setHarvestSourceBody.name),
    setHarvestSourceBody,
    buildSourceContainer,
    keepHarvesting,
    endState
};
